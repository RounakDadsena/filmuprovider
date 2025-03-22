import { Embed, Sourcerer } from '@/providers/base';
import { doodScraper } from '@/providers/embeds/dood';
import { droploadScraper } from '@/providers/embeds/dropload';
import { febboxHlsScraper } from '@/providers/embeds/febbox/hls';
import { febboxMp4Scraper } from '@/providers/embeds/febbox/mp4';
import { filelionsScraper } from '@/providers/embeds/filelions';
import { mixdropScraper } from '@/providers/embeds/mixdrop';
import { mp4uploadScraper } from '@/providers/embeds/mp4upload';
import { streambucketScraper } from '@/providers/embeds/streambucket';
import { streamsbScraper } from '@/providers/embeds/streamsb';
import { upcloudScraper } from '@/providers/embeds/upcloud';
import { upstreamScraper } from '@/providers/embeds/upstream';
import { vidsrcembedScraper } from '@/providers/embeds/vidsrc';
import { vTubeScraper } from '@/providers/embeds/vtube';
import { twoEmbedScraper } from '@/providers/sources/2embed';
import { filmxyScraper } from '@/providers/sources/filmxy';
import { flixhqScraper } from '@/providers/sources/flixhq/index';
import { goMoviesScraper } from '@/providers/sources/gomovies/index';
import { insertunitScraper } from '@/providers/sources/insertunit';
import { kissAsianScraper } from '@/providers/sources/kissasian/index';
import { lookmovieScraper } from '@/providers/sources/lookmovie';
import { nsbxScraper } from '@/providers/sources/nsbx';
import { remotestreamScraper } from '@/providers/sources/remotestream';
import { showboxScraper } from '@/providers/sources/showbox/index';
import { tugaflixScraper } from '@/providers/sources/tugaflix';
import { vidsrcScraper } from '@/providers/sources/vidsrc/index';
import { mirrorsScraper } from '@/providers/sources/whvxMirrors';
import { zoechipScraper } from '@/providers/sources/zoechip';
import { vidsrcsuScraper } from '@/providers/sources/vidsrcsu';

import {
  hidiscrapeBengaliScraper,
  hidiscrapeEnglishScraper,
  hidiscrapeHindiScraper,
  hidiscrapeTamilScraper,
  hidiscrapeTeluguScraper,
} from './embeds/autoembed';
import { bflixScraper } from './embeds/bflix';
import { closeLoadScraper } from './embeds/closeload';
import { fileMoonScraper } from './embeds/filemoon';
import { fileMoonMp4Scraper } from './embeds/filemoon/mp4';
import { hydraxScraper } from './embeds/hydrax';
import { mp4hydraServer1Scraper, mp4hydraServer2Scraper } from './embeds/mp4hydra';
import { alphaScraper, deltaScraper } from './embeds/nsbx';
import { playm4uNMScraper } from './embeds/playm4u/nm';
import { smashyStreamOScraper } from './embeds/smashystream/opstream';
import { smashyStreamFScraper } from './embeds/smashystream/video1';
import { streamTapeScraper } from './embeds/streamtape';
import { streamvidScraper } from './embeds/streamvid';
import { streamwishScraper } from './embeds/streamwish';
import { turbovidScraper } from './embeds/turbovid';
import { vidCloudScraper } from './embeds/vidcloud';
import { vidkerScraper } from './embeds/vidker';
import { vidMolyScraper } from './embeds/vidmoly';
import { vidplayScraper } from './embeds/vidplay';
import { voeScraper } from './embeds/voe';
import { warezcdnembedHlsScraper } from './embeds/warezcdn/hls';
import { warezcdnembedMp4Scraper } from './embeds/warezcdn/mp4';
import { astraScraper, novaScraper, orionScraper } from './embeds/whvx';
import { amznScraper, ntflxScraper } from './embeds/whvxMirrors';
import { streamboxScraper } from './sources/streambox';
import { wootlyScraper } from './embeds/wootly';
import { hindiScraper } from './sources/autoembed';
import { catflixScraper } from './sources/catflix';
import { ee3Scraper } from './sources/ee3';
import { goojaraScraper } from './sources/goojara';
import { hdRezkaScraper } from './sources/hdrezka';
import { m4uScraper } from './sources/m4ufree';
import { moviplusScraper } from './sources/moviplus';
import { mp4hydraScraper } from './sources/mp4hydra';
import { nepuScraper } from './sources/nepu';
import { netMirrorScraper } from './sources/netmirror';
import { nitesScraper } from './sources/nites';
import { primewireScraper } from './sources/primewire';
import { ridooMoviesScraper } from './sources/ridomovies';
import { smashyStreamScraper } from './sources/smashystream';
import { soaperTvScraper } from './sources/soapertv';
import { vidSrcToScraper } from './sources/vidsrcto';
import { warezcdnScraper } from './sources/warezcdn';
import { whvxScraper } from './sources/whvx';
import {
  VidsrcsuServer1Scraper,
  VidsrcsuServer2Scraper,
  VidsrcsuServer3Scraper,
  VidsrcsuServer4Scraper,
  VidsrcsuServer5Scraper,
  VidsrcsuServer6Scraper,
  VidsrcsuServer7Scraper,
  VidsrcsuServer8Scraper,
  VidsrcsuServer9Scraper,
  VidsrcsuServer10Scraper,
  VidsrcsuServer11Scraper,
  VidsrcsuServer12Scraper,
  VidsrcsuServer20Scraper,
} from './embeds/vidsrcsu';

export function gatherAllSources(): Array<Sourcerer> {
  // all sources are gathered here
  return [
    flixhqScraper,
    remotestreamScraper,
    kissAsianScraper,
    showboxScraper,
    goMoviesScraper,
    zoechipScraper,
    vidsrcScraper,
    ridooMoviesScraper,
    lookmovieScraper,
    nsbxScraper,
    vidSrcToScraper,
    nepuScraper,
    m4uScraper,
    goojaraScraper,
    hdRezkaScraper,
    primewireScraper,
    warezcdnScraper,
    insertunitScraper,
    nitesScraper,
    soaperTvScraper,
    tugaflixScraper,
    whvxScraper,
    smashyStreamScraper,
    ee3Scraper,
    catflixScraper,
    hindiScraper,
    moviplusScraper,
    vidsrcsuScraper,
    filmxyScraper,
    twoEmbedScraper,
    netMirrorScraper,
    mirrorsScraper,
    mp4hydraScraper,
    streamboxScraper,
  ];
}

export function gatherAllEmbeds(): Array<Embed> {
  // all embeds are gathered here
  return [
    upcloudScraper,
    vidCloudScraper,
    mp4uploadScraper,
    streamsbScraper,
    upstreamScraper,
    febboxMp4Scraper,
    febboxHlsScraper,
    mixdropScraper,
    vidsrcembedScraper,
    streambucketScraper,
    closeLoadScraper,
    fileMoonScraper,
    fileMoonMp4Scraper,
    deltaScraper,
    alphaScraper,
    vidplayScraper,
    wootlyScraper,
    streamvidScraper,
    voeScraper,
    streamTapeScraper,
    droploadScraper,
    filelionsScraper,
    vTubeScraper,
    warezcdnembedHlsScraper,
    warezcdnembedMp4Scraper,
    bflixScraper,
    playm4uNMScraper,
    hydraxScraper,
    vidMolyScraper,
    novaScraper,
    astraScraper,
    orionScraper,
    smashyStreamFScraper,
    smashyStreamOScraper,
    turbovidScraper,
    hidiscrapeEnglishScraper,
    hidiscrapeHindiScraper,
    hidiscrapeBengaliScraper,
    hidiscrapeTamilScraper,
    hidiscrapeTeluguScraper,
    vidkerScraper,
    VidsrcsuServer1Scraper,
    VidsrcsuServer2Scraper,
    VidsrcsuServer3Scraper,
    VidsrcsuServer4Scraper,
    VidsrcsuServer5Scraper,
    VidsrcsuServer6Scraper,
    VidsrcsuServer7Scraper,
    VidsrcsuServer8Scraper,
    VidsrcsuServer9Scraper,
    VidsrcsuServer10Scraper,
    VidsrcsuServer11Scraper,
    VidsrcsuServer12Scraper,
    VidsrcsuServer20Scraper,
    streamwishScraper,
    doodScraper,
    amznScraper,
    ntflxScraper,
    mp4hydraServer1Scraper,
    mp4hydraServer2Scraper,
  ];
}
