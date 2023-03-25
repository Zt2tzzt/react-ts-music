import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import AreaHeaderV2 from '@/components/area-header-v2/AreaHeaderV2'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { getImageSize } from '@/utils/format'

interface IProps {
	children?: ReactNode
}
const SettleSinger: FC<IProps> = memo(() => {
	const { settleSingers } = useAppSelector(
		state => ({
			settleSingers: state.recommend.settleSingers
		}),
		shallowEqual
	)

	return (
		<RootWrapper>
			{/* 头部标题 */}
			<AreaHeaderV2
				title='入住歌手'
				moreText='查看全部'
				moreLink='#/discover/artist'
			></AreaHeaderV2>
			{/* 歌手列表 */}
			<div className='artists'>
				{settleSingers.map(item => (
					<a href='#/discover/artist' className='item' key={item.id}>
						<img src={getImageSize(item.picUrl, 80)} alt='' />
						<div className='info'>
							<div className='name'>{item.name}</div>
							<div className='alias'>{item.alias.join(' ')}</div>
						</div>
					</a>
				))}
			</div>
			{/* 申请成为网易音乐人 */}
			<div className='apply-for'>
				<a href='#/'>申请成为网易音乐人</a>
			</div>
		</RootWrapper>
	)
})

SettleSinger.displayName = 'SettleSinger'

export default SettleSinger
