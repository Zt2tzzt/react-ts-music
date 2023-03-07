import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './cpns/nav-bar/NavBar'

interface IProps {
	children?: ReactNode
}
const Discover: FC<IProps> = memo(() => {
	return (
		<div>
			<NavBar></NavBar>
			<Suspense>
				<Outlet></Outlet>
			</Suspense>
		</div>
	)
})

Discover.displayName = 'Discover'

export default Discover
