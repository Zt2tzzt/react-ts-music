import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { AppHeaderWrapper, HeaderLeftWrapper, HeaderRightWrapper } from './style'
import headerTitles from '@/assets/data/header-titles.json'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface IProps {
	children?: ReactNode
}
const AppHeader: FC<IProps> = memo(() => {
	/* const onFoucs: React.FocusEventHandler<HTMLInputElement> = e => {
		console.log('e:', e.currentTarget)
		e.currentTarget.setAttribute('placeholder', '')
	} */

	return (
		<AppHeaderWrapper>
			<div className='content wrap_v1'>
				<HeaderLeftWrapper>
					{/* logo */}
					<a className='logo sprite_01' href='/'>
						网易云音乐
					</a>
					{/* 一级路由 */}
					<div className='title-list'>
						{headerTitles.map(item => (
							<div className='item' key={item.title}>
								{/* {showItem(item)} */}
								{item.type === 'path' ? (
									<NavLink
										to={item.link}
										className={({ isActive }) => (isActive ? 'active' : undefined)}
									>
										{item.title}
										<i className='icon sprite_01'></i>
									</NavLink>
								) : item.type === 'link' ? (
									<a href={item.link} rel='noreferrer' target='_blank'>
										{item.title}
									</a>
								) : undefined}
							</div>
						))}
					</div>
				</HeaderLeftWrapper>

				<HeaderRightWrapper>
					<Input
						// onFocus={onFoucs}
						className='search'
						placeholder='音乐/视频/电台/用户'
						prefix={<SearchOutlined></SearchOutlined>}
					></Input>
					<span className='center'>创作者中心</span>
					<span className='sign-in'>登录</span>
				</HeaderRightWrapper>
			</div>
			<div className='divider'></div>
		</AppHeaderWrapper>
	)
})

AppHeader.displayName = 'AppHeader'

export default AppHeader
