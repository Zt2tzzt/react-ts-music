import React, { type ElementRef, memo, useRef, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import {
	TopBannersWrapper,
	BannerControlWrapper,
	BannerLeftWrapper,
	BannerRightWrapper
} from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { Carousel } from 'antd'
import classNames from 'classnames'

interface IProps {
	children?: ReactNode
}
const TopBanners: FC<IProps> = memo(() => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const { banners } = useAppSelector(
		state => ({
			banners: state.recommend.banners
		}),
		shallowEqual
	)

	const carouselRef = useRef<ElementRef<typeof Carousel>>(null)

	// 走马灯，切换前，事件
	const onCarouselBeforechange = useCallback((from: number, to: number) => {
		setCurrentIndex(to)
	}, [])

	// 指示器
	const onDotClick = (index: number) => {
		carouselRef.current?.goTo(index)
	}

	// 箭头，控制器
	const onPrevClick = () => {
		carouselRef.current?.prev()
	}
	const onNextClick = () => {
		carouselRef.current?.next()
	}

	let bgImgUrl = ''
	if (currentIndex >= 0 && banners.length > 0) {
		bgImgUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
	}
	return (
		<TopBannersWrapper style={{ background: `url('${bgImgUrl}') center center / 6000px` }}>
			<div className='banner wrap_v2'>
				<BannerLeftWrapper>
					{/* 轮播图 */}
					<Carousel
						autoplay
						dots={false}
						autoplaySpeed={3000}
						effect='fade'
						ref={carouselRef}
						beforeChange={onCarouselBeforechange}
					>
						{banners.map(item => (
							<div className='banner-item' key={item.imageUrl}>
								<img className='image' src={item.imageUrl} alt={item.typeTitle} />
							</div>
						))}
					</Carousel>
					{/* 轮播图指示器 */}
					<ul className='dots'>
						{banners.map((item, index) => (
							<li key={item.imageUrl}>
								<span
									className={classNames('item', { active: index === currentIndex })}
									onClick={() => onDotClick(index)}
								></span>
							</li>
						))}
					</ul>
				</BannerLeftWrapper>
				{/* 下载区域 */}
				<BannerRightWrapper>
					<p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
				</BannerRightWrapper>
				{/* 箭头 */}
				<BannerControlWrapper>
					<button className='btn left' onClick={onPrevClick}></button>
					<button className='btn right' onClick={onNextClick}></button>
				</BannerControlWrapper>
			</div>
		</TopBannersWrapper>
	)
})

TopBanners.displayName = 'TopBanners'

export default TopBanners
