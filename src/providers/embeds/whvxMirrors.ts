import { EmbedOutput, makeEmbed } from '@/providers/base';
import { baseUrl } from '@/providers/sources/whvxMirrors';
import { NotFoundError } from '@/utils/errors';

const providers = [
  {
    id: 'amzn',
    rank: 620,
  },
  {
    id: 'ntflx',
    rank: 610,
  },
];


function embed(provider: { id: string; rank: number }) {
  return makeEmbed({
    id: provider.id,
    name: provider.id.toUpperCase(),
    rank: provider.rank,
    disabled: false,
    async scrape(ctx) {
      let progress = 50;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 1;
          ctx.progress(progress);
        }
      }, 100);

      try {
        const query = JSON.parse(ctx.url);
        const urlEncodedTitle = encodeURIComponent(query.title || ''); // Fallback to empty string if not found
        const urlEncodedReleaseYear = encodeURIComponent(query.releaseYear || '');
        let url = `${baseUrl}scrape?title=${urlEncodedTitle}&type=${query.type}&releaseYear=${urlEncodedReleaseYear}&provider=${provider.id}`;
        if (query.type === 'show') url += `&season=${query.season}&episode=${query.episode}`;
        const result = await ctx.fetcher(url);
        clearInterval(interval);
        ctx.progress(100);

        return result as EmbedOutput;
      } catch (error) {
        clearInterval(interval);
        ctx.progress(100);
        throw new NotFoundError('Failed to search');
      }
    },
  });
}

export const [amznScraper, ntflxScraper] = providers.map(embed);
