import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import AreaHeaderV1 from '@/components/area-header-v1/AreaHeaderV1'

interface IProps {
	children?: ReactNode
}
const PopularRanking: FC<IProps> = memo(() => {
	return (
		<RootWrapper>
			<AreaHeaderV1 titleText='榜单' moreLink='/discover/ranking'></AreaHeaderV1>
			<div className='content'></div>
		</RootWrapper>
	)
})

PopularRanking.displayName = 'PopularRanking'

export default PopularRanking
