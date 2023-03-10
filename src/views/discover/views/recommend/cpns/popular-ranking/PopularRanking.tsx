import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import AreaHeaderV1 from '@/components/area-header-v1/AreaHeaderV1'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import RankingItem from './cpns/ranking-item/RankingItem'

interface IProps {
	children?: ReactNode
}
const PopularRanking: FC<IProps> = memo(() => {
	const { rankings } = useAppSelector(
		state => ({
			rankings: state.recommend.popularRankings
		}),
		shallowEqual
	)

	return (
		<RootWrapper>
			<AreaHeaderV1 titleText='榜单' moreLink='/discover/ranking'></AreaHeaderV1>
			<div className='content'>
				{rankings.map(item => (
					<RankingItem key={item.id} itemData={item}></RankingItem>
				))}
			</div>
		</RootWrapper>
	)
})

PopularRanking.displayName = 'PopularRanking'

export default PopularRanking
