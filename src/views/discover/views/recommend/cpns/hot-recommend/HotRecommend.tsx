import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import AreaHeaderV1 from '@/components/area-header-v1/AreaHeaderV1'
import SongMenuItem from '@/components/song-menu-item/SongMenuItem'
import RootWrapper from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}
const HotRecommend: FC<IProps> = memo(() => {
  const { hotRecommends } = useAppSelector(
    state => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )

  return (
    <RootWrapper>
      <AreaHeaderV1
        titleText='热门推荐'
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink='/discover/songs'
      ></AreaHeaderV1>
      <div className='recommend-list'>
        {hotRecommends.map(item => (
          <SongMenuItem key={item.id} itemData={item}></SongMenuItem>
        ))}
      </div>
    </RootWrapper>
  )
})

HotRecommend.displayName = 'HotRecommend'

export default HotRecommend
