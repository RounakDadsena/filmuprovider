import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: '8stream-hindi',
    rank: 110,
    name: '8Stream Hindi'
  },
  {
    id: '8stream-english',
    rank: 100,
    name: '8Stream English'
  },
  {
    id: '8stream-tamil',
    rank: 90,
    name: '8Stream Tamil'
  },
  {
    id: '8stream-telugu',
    rank: 85,
    name: '8Stream Telugu'
  },
  {
    id: '8stream-bengali',
    rank: 80,
    name: '8Stream Bengali'
  }
];

function embed(provider: { id: string; rank: number; name: string; disabled?: boolean }) {
  return makeEmbed({
    id: provider.id,
    name: provider.name,
    disabled: provider.disabled,
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
  Stream8HindiEmbed,
  Stream8EnglishEmbed,
  Stream8TamilEmbed,
  Stream8TeluguEmbed,
  Stream8BengaliEmbed,
] = providers.map(embed);
