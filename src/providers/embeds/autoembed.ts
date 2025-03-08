import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: 'hindiscrape-english',
    rank: 10,
  },
  {
    id: 'hindiscrape-hindi',
    rank: 9,
  },
  {
    id: 'hindiscrape-tamil',
    rank: 8,
  },
  {
    id: 'hindiscrape-telugu',
    rank: 7,
  },
  {
    id: 'hindiscrape-bengali',
    rank: 6,
  },
];

function embed(provider: { id: string; rank: number }) {
  return makeEmbed({
    id: provider.id,
    name: provider.id.charAt(0).toUpperCase() + provider.id.slice(1),
    rank: provider.rank,
    async scrape(ctx) {
      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: ctx.url,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const [
  hidiscrapeEnglishScraper,
  hidiscrapeHindiScraper,
  hidiscrapeBengaliScraper,
  hidiscrapeTamilScraper,
  hidiscrapeTeluguScraper,
] = providers.map(embed);
