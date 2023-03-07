import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchBannerDataAction } from '@/store/features/discover/recommend'
import TopBanners from './cpns/top-banners/TopBanners'
import { useAppDispatch } from '@/store'

interface IProps {
	children?: ReactNode
}
const Recommend: FC<IProps> = memo(() => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBannerDataAction())
	}, [])

	return (
		<div>
			<TopBanners></TopBanners>
		</div>
	)
})

Recommend.displayName = 'Recommend'

export default Recommend
