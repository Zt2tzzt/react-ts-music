import ztRequest from '@/service'
import type { ISongDetailResult, ILyricResult } from '@/types'

export const getSongDetail = (ids: number) =>
  ztRequest.get<ISongDetailResult>({
    url: '/song/detail',
    params: {
      ids
    }
  })

export const getSongLyric = (id: number) =>
  ztRequest.get<ILyricResult>({
    url: '/lyric',
    params: {
      id
    }
  })
