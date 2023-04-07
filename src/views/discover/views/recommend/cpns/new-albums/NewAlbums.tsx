import React, { type ElementRef, memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import AreaHeaderV1 from '@/components/area-header-v1/AreaHeaderV1'
import { Carousel } from 'antd'
import { useAppSelector } from '@/store'
import AlbumItem from '@/components/album-item/AlbumItem'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}
const NewAlbums: FC<IProps> = memo(() => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  const { newAlbums } = useAppSelector(
    state => ({
      newAlbums: state.recommend.newAlbum
    }),
    shallowEqual
  )

  const onPreClick = () => {
    bannerRef.current?.prev()
  }
  const onNextClick = () => {
    bannerRef.current?.next()
  }

  return (
    <RootWrapper>
      <AreaHeaderV1 titleText='新碟上架' moreLink='/discover/album'></AreaHeaderV1>

      <div className='content'>
        {/* 控制器1 */}
        <button className='sprite_02 arrow arrow-left' onClick={onPreClick}></button>

        {/* 轮播图 */}
        <div className='banner'>
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <div className='album-list'>
                  {newAlbums.slice(index * 5, (index + 1) * 5).map(album => (
                    <AlbumItem key={album.id} itemData={album}></AlbumItem>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 控制器2 */}
        <button className='sprite_02 arrow arrow-right' onClick={onNextClick}></button>
      </div>
    </RootWrapper>
  )
})

NewAlbums.displayName = 'NewAlbums'

export default NewAlbums
