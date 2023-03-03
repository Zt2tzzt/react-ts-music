import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'

interface IProps {
	children?: ReactNode
}
const Discover: FC<IProps> = memo(() => {
	return (
		<div>
			<div className='discover-nav'>
				<Link to='/discover/recommend'>推荐</Link> |<Link to='/discover/ranking'>排行榜</Link> |
				<Link to='/discover/songs'>歌单</Link> |<Link to='/discover/djradio'>主播电台</Link> |
				<Link to='/discover/artist'>歌手</Link> |<Link to='/discover/album'>新碟上架</Link> |
			</div>
			<Suspense>
				<Outlet></Outlet>
			</Suspense>
		</div>
	)
})

Discover.displayName = 'Discover'

export default Discover
