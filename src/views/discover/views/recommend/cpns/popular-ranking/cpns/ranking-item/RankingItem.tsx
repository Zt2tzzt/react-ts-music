import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import type { IPlaylist } from '@/types'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { playTheMusicAction } from '@/store/features/player/player'

interface IProps {
  children?: ReactNode
  itemData: IPlaylist
}
const RankingItem: FC<IProps> = memo(props => {
  const { itemData } = props
  const { tracks = [] } = itemData

  const dispatch = useAppDispatch()

  const onPlayClick = (id: number) => {
    dispatch(playTheMusicAction(id))
  }

  return (
    <RootWrapper>
      {/* header */}
      <div className='header'>
        <div className='image'>
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt='' />
          <a className='sprite_cover' href=''></a>
        </div>
        <div className='info'>
          <div className='name'>{itemData.name}</div>
          <div>
            <button className='sprite_02 btn play'></button>
            <button className='sprite_02 btn favor'></button>
          </div>
        </div>
      </div>
      {/* list */}
      <div className='list'>
        {tracks.slice(0, 10).map((item, index) => (
          <div className='item' key={item.id}>
            <div className='index'>{index + 1}</div>
            <div className='info'>
              <div className='name'>{item.name}</div>
              <div className='operator'>
                <button
                  className='btn sprite_02 play'
                  onClick={() => onPlayClick(item.id)}
                ></button>
                <button className='btn sprite_icon2 add'></button>
                <button className='btn sprite_02 favor'></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='footer'>
        <a href='#/discover/ranking'>查看全部 &gt;</a>
      </div>
    </RootWrapper>
  )
})

RankingItem.displayName = 'RankingItem'

export default RankingItem
