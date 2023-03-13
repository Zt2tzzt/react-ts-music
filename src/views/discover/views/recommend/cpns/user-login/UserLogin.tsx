import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'

interface IProps {
	children?: ReactNode
}
const UserLogin: FC<IProps> = memo(() => {
	return (
		<RootWrapper className='sprite_02'>
			<p className='desc'>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
			<a href='#/login' className='sprite_02'>
				用户登陆
			</a>
		</RootWrapper>
	)
})

UserLogin.displayName = 'UserLogin'

export default UserLogin
