import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import type { IPersonalized } from '@/types'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
	children?: ReactNode
	itemData: IPersonalized
}
const SongMenuItem: FC<IProps> = memo(props => {
	const { itemData } = props

	return (
		<RootWrapper>
			<div className='top'>
				<img src={getImageSize(itemData.picUrl, 140)} alt='' />
				<div className='cover sprite_cover'>
					<div className='info sprite_cover'>
						<span>
							<i className='sprite_icon headset'></i>
							<span className='count'>{formatCount(itemData.playCount)}</span>
						</span>
						<i className='sprite_icon play'></i>
					</div>
				</div>
			</div>
			<div className='bottom'>{itemData.name}</div>
		</RootWrapper>
	)
})

SongMenuItem.displayName = 'SongMenuItem'

export default SongMenuItem
