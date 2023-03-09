import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './stytle'
import type { IAlbum } from '@/types'
import { getImageSize } from '@/utils/format'

interface IProps {
	children?: ReactNode
	itemData: IAlbum
}
const NewAlbumItem: FC<IProps> = memo(props => {
	const { itemData } = props

	return (
		<RootWrapper className='sprite_02'>
			<div className='top'>
				<img src={getImageSize(itemData.picUrl, 100)} alt='' />
				<a href='' className='cover sprite_cover'></a>
				<a href='' className='play sprite_icon'></a>
			</div>
			<div className='bottom'>
				<div className='name'>{itemData.name}</div>
				<div className='artist'>{itemData.artist.name}</div>
			</div>
		</RootWrapper>
	)
})

NewAlbumItem.displayName = 'NewAlbumItem'

export default NewAlbumItem
