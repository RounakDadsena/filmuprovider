/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';

const baseUrl = 'https://hindiscrape.whvx.net';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  let endpoint = `/movie/${ctx.media.tmdbId}`;

  if (ctx.media.type === 'show') {
    endpoint = `/tv/${ctx.media.tmdbId}/${ctx.media.season.number.toString()}/${ctx.media.episode.number.toString()}`;
  }

  const playerPage = await ctx.proxiedFetcher(endpoint, {
    baseUrl,
  });

  // Directly access the sources from playerPage (which is already a parsed JSON object)
  const fileData: { label: string; file: string }[] = playerPage.sources;

  const embeds: SourcererEmbed[] = [];

  for (const stream of fileData) {
    console.log(stream);
    const url = stream.file;
    if (!stream.file) {
      console.log(`Skipping stream due to missing file:`, stream); // Log skipped stream
      continue;
    }

    // Generating embedId using the label (in lowercase)
    const embedId = `hindiscrape-${stream.label.toLowerCase().trim()}`;
    console.log(`Generated embedId: ${embedId}`);

    // Push the embed with the generated embedId and url
    embeds.push({ embedId, url });
  }

  console.log(embeds);
  return {
    embeds,
  };
}

export const hindiScraper = makeSourcerer({
  id: 'hindiscraper',
  name: 'India Scraper',
  rank: 100,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
