import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchRecommendDataAction } from '@/store/features/discover/recommend'
import TopBanners from './cpns/top-banners/TopBanners'
import { useAppDispatch } from '@/store'
import RecommendWrapper from './style'
import HotRecommend from './cpns/hot-recommend/HotRecommend'
import NewAlbums from './cpns/new-albums/NewAlbums'
import PopularRanking from './cpns/popular-ranking/PopularRanking'
import UserLogin from './cpns/user-login/UserLogin'
import SettleSinger from './cpns/settle-singer/SettleSinger'
import HotAnchor from './cpns/hot-anchor/HotAnchor'

interface IProps {
  children?: ReactNode
}
const Recommend: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanners></TopBanners>
      <div className='content wrap_v2'>
        <div className='left'>
          <HotRecommend></HotRecommend>
          <NewAlbums></NewAlbums>
          <PopularRanking></PopularRanking>
        </div>
        <div className='right'>
          <UserLogin></UserLogin>
          <SettleSinger></SettleSinger>
          <HotAnchor></HotAnchor>
        </div>
      </div>
    </RecommendWrapper>
  )
})

Recommend.displayName = 'Recommend'

export default Recommend
