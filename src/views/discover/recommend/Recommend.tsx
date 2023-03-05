import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import ztRequest from '@/service'

interface IProps {
	children?: ReactNode
}

export interface IBannerData {
	imageUrl: string
	targetId: number
	targetType: number
	titleColor: string
	typeTitle: string
	url: string
	exclusive: boolean
	scm: string
	bannerBizType: string
}

const Recommend: FC<IProps> = memo(() => {
	const [banners, setBanners] = useState<IBannerData[]>([])

	useEffect(() => {
		ztRequest.get<{ banners: IBannerData[]; code: number }>({ url: '/banner' }).then(res => setBanners(res.banners))
	})

	return (
		<div>
			{banners.map((item, index) => (
				<div key={index}>{item.imageUrl}</div>
			))}
		</div>
	)
})

Recommend.displayName = 'Recommend'

export default Recommend
