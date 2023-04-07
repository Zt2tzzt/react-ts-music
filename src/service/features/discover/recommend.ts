import type {
  IBannersResult,
  IPersonalizedResult,
  iAlbumRsesult,
  IPopularRankingResult,
  IArtistResult
} from '@/types'
import ztRequest from '../..'

export const getBanners = () =>
  ztRequest.get<IBannersResult>({
    url: '/banner'
  })

export const getHotRecommend = (limit = 30) =>
  ztRequest.get<IPersonalizedResult>({
    url: '/personalized',
    params: {
      limit
    }
  })

export const getNewAlbum = () =>
  ztRequest.get<iAlbumRsesult>({
    url: '/album/newest'
  })

export const getPopularRankingList = (id: number) =>
  ztRequest.get<IPopularRankingResult>({
    url: 'playlist/detail',
    params: {
      id
    }
  })

export const getArtistList = (limit = 30) =>
  ztRequest.get<IArtistResult>({
    url: '/artist/list',
    params: {
      limit
    }
  })
