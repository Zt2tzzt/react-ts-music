import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import AreaHeaderV2 from '@/components/area-header-v2/AreaHeaderV2'
import hotAnchors from '@/assets/data/hot-anchors.json'

interface IProps {
  children?: ReactNode
}
const HotAnchor: FC<IProps> = memo(() => {
  return (
    <RootWrapper>
      {/* 头部标题 */}
      <AreaHeaderV2 title='热门主播'></AreaHeaderV2>
      {/* 歌手列表 */}
      <div className='anchors'>
        {hotAnchors.map(item => (
          <div className='item' key={item.picUrl}>
            <a href='' className='image'>
              <img src={item.picUrl} alt='' />
            </a>
            <div className='info'>
              <div className='name'>{item.name}</div>
              <div className='position'>{item.position}</div>
            </div>
          </div>
        ))}
      </div>
    </RootWrapper>
  )
})

HotAnchor.displayName = 'HotAnchor'

export default HotAnchor
