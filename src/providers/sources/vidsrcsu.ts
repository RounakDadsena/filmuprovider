import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const getHost = () => {
  const urlObj = new URL(window.location.href);
  return `${urlObj.protocol}//${urlObj.host}`;
};

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const embedPage = await ctx.proxiedFetcher(
    `https://vidsrc.su/embed/${ctx.media.type === 'movie' ? `movie/${ctx.media.tmdbId}` : `tv/${ctx.media.tmdbId}/${ctx.media.season.number}/${ctx.media.episode.number}`}`,
    {
      headers: {
        Referer: getHost(),
      },
    },
  );
  // eslint-disable-next-line no-console
  console.log('host', getHost());

  ctx.progress(30);

  const decodedPeterMatch = embedPage.match(/decodeURIComponent\('([^']+)'\)/);
  const decodedPeterUrl = decodedPeterMatch ? decodeURIComponent(decodedPeterMatch[1]) : null;

  const serverMatches = [...embedPage.matchAll(/label: 'Server (\d+)', url: '(https.*)'/g)];

  const servers = serverMatches.map((match) => ({
    serverNumber: parseInt(match[1], 10),
    url: match[2],
  }));

  if (decodedPeterUrl) {
    servers.push({
      serverNumber: 40,
      url: decodedPeterUrl,
    });
  }

  ctx.progress(60);

  if (!servers.length) throw new NotFoundError('No server playlist found');

  // Process orbitproxy.ru URLs so we can proxy yourself
  // REQUIRES A PROXY FOR MOST SERVERS set it up here https://github.com/Pasithea0/M3U8-Proxy
  const processedServers = await Promise.all(
    servers.map(async (server) => {
      if (server.url.includes('orbitproxy.ru')) {
        try {
          const urlParts = server.url.split('orbitproxy.ru/');
          if (urlParts.length >= 2) {
            const encryptedPart = urlParts[1].split('.m3u8')[0];

            try {
              const decodedData = Buffer.from(encryptedPart, 'base64').toString('utf-8');
              // eslint-disable-next-line no-console
              console.log('Decoded data:', decodedData);

              const jsonData = JSON.parse(decodedData);

              const originalUrl = jsonData.u;
              // const origin = jsonData.o || '';
              const referer = jsonData.r || '';

              const encodedUrl = encodeURIComponent(originalUrl);
              const encodedHeaders = encodeURIComponent(
                JSON.stringify({
                  // origin,
                  referer,
                }),
              );

              const proxyUrl = `https://fed-m3u8.pstream.org/m3u8-proxy?url=${encodedUrl}&headers=${encodedHeaders}`; // bring your own
              // eslint-disable-next-line no-console
              console.log('Created proxy URL:', proxyUrl);

              return {
                ...server,
                url: proxyUrl,
              };
            } catch (jsonError) {
              // eslint-disable-next-line no-console
              console.error('Error decoding/parsing orbitproxy data:', jsonError);
              return server;
            }
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error processing orbitproxy URL:', error);
        }
      }
      return server;
    }),
  );

  const embeds: SourcererEmbed[] = processedServers.map((server) => ({
    embedId: `server-${server.serverNumber}`,
    url: server.url,
  }));
  ctx.progress(90);

  return {
    embeds,
  };
}
export const vidsrcsuScraper = makeSourcerer({
  id: 'vidsrcsu',
  name: 'filmu 3',
  rank: 270,
  disabled: true,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
