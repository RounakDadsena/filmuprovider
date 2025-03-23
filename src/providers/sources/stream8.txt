import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

// API endpoints for 8Stream
const API_BASE_URL = 'https://8-stream-api.vercel.app/api/v1';

// Cache for TMDB to IMDB conversions
const tmdbToImdbCache = new Map<string, string>();

/**
 * Converts TMDB ID to IMDB ID using a third-party service
 */
async function convertTmdbToImdb(tmdbId: string, type: 'movie' | 'tv', fetcher: (url: string, init?: RequestInit) => Promise<string>): Promise<string> {
  // Check cache first
  const cacheKey = `${type}-${tmdbId}`;
  if (tmdbToImdbCache.has(cacheKey)) {
    return tmdbToImdbCache.get(cacheKey)!;
  }
  
  // Using TMDb API to get the IMDb ID
  const response = await fetcher(`https://api.themoviedb.org/3/${type}/${tmdbId}/external_ids?api_key=YOUR_TMDB_API_KEY`);
  const data = JSON.parse(response);
  
  if (!data.imdb_id) {
    throw new NotFoundError(`Could not find IMDb ID for TMDB ID: ${tmdbId}`);
  }
  
  // Store in cache
  tmdbToImdbCache.set(cacheKey, data.imdb_id);
  return data.imdb_id;
}

/**
 * Common scraper function for both movies and TV shows
 */
async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  ctx.progress(10);
  
  // Convert TMDB ID to IMDB ID
  const imdbId = await convertTmdbToImdb(ctx.media.tmdbId, ctx.media.type, ctx.proxiedFetcher);
  ctx.progress(20);
  
  // Get media info
  const mediaInfoResponse = await ctx.proxiedFetcher(`${API_BASE_URL}/mediaInfo?id=${imdbId}`);
  const mediaInfoData = JSON.parse(mediaInfoResponse);
  
  if (!mediaInfoData.success || !mediaInfoData.data || !mediaInfoData.data.playlist || !mediaInfoData.data.key) {
    throw new NotFoundError(`Could not get media info for IMDb ID: ${imdbId}`);
  }
  
  const mediaInfo = mediaInfoData.data;
  ctx.progress(40);
  
  // For TV shows, verify if the season/episode exists
  if (ctx.media.type === 'tv') {
    const seasonListResponse = await ctx.proxiedFetcher(`${API_BASE_URL}/getSeasonList?id=${imdbId}`);
    const seasonListData = JSON.parse(seasonListResponse);
    
    if (!seasonListData.success || !seasonListData.data) {
      throw new NotFoundError(`Could not get season list for IMDb ID: ${imdbId}`);
    }
    
    // Check if the requested season exists
    const seasonNumber = (ctx.media as ShowScrapeContext).media.season.number;
    const seasonExists = seasonListData.data.seasons.some((season: any) => 
      season.season === `Season ${seasonNumber}` || season.season === seasonNumber.toString()
    );
    
    if (!seasonExists) {
      throw new NotFoundError(`Season ${seasonNumber} not found`);
    }
    
    ctx.progress(50);
  }
  
  // Process each language option
  const embeds: SourcererEmbed[] = [];
  
  for (const lang of mediaInfo.playlist) {
    try {
      // Get streaming link
      const streamResponse = await ctx.proxiedFetcher(`${API_BASE_URL}/getStream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: lang.file, key: mediaInfo.key }),
      });
      
      const streamData = JSON.parse(streamResponse);
      
      if (streamData.success && streamData.data && streamData.data.link) {
        embeds.push({
          embedId: `8stream-${lang.title.toLowerCase()}`,
          url: streamData.data.link,
          name: lang.title
        });
      }
    } catch (error) {
      console.error(`Failed to get stream for ${lang.title}:`, error);
      // Continue with other languages if one fails
    }
  }
  
  ctx.progress(90);
  
  if (embeds.length === 0) {
    throw new NotFoundError('No streams found');
  }
  
  return {
    embeds,
  };
}

export const stream8Scraper = makeSourcerer({
  id: 'stream8',
  name: '8Stream',
  rank: 280,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
