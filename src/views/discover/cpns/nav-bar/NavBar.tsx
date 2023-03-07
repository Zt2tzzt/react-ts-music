import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import NavBarWrapper from './style'
import discoverTitles from '@/assets/data/discover-titles.json'
import { NavLink } from 'react-router-dom'

interface IProps {
	children?: ReactNode
}
const NavBar: FC<IProps> = memo(() => {
	return (
		<NavBarWrapper>
			<div className='nav wrap_v1'>
				{discoverTitles.map(item => (
					<div className='item' key={item.link}>
						<NavLink to={item.link}>{item.title}</NavLink>
					</div>
				))}
			</div>
		</NavBarWrapper>
	)
})

NavBar.displayName = 'NavBar'

export default NavBar
