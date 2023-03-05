import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AppHeaderWrapper from './app-header-style'

interface IProps {
	children?: ReactNode
}
const AppHeader: FC<IProps> = memo(() => {
	return (
		<AppHeaderWrapper>
			<Link to='/discover'>发现音乐</Link> | <Link to='/mine'>我的音乐</Link> | <Link to='/foucs'>关注</Link> |
			<Link to='/download'>下载客户端</Link> |
		</AppHeaderWrapper>
	)
})

AppHeader.displayName = 'AppHeader'

export default AppHeader
