import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'

interface IProps {
	children?: ReactNode
	title?: string
	moreText?: string
	moreLink?: string
}
const AreaHeaderV2: FC<IProps> = memo(props => {
	const { title = '默认标题', moreText, moreLink } = props

	return (
		<RootWrapper>
			<h3 className='title'>{title}</h3>
			{moreText && moreLink && <a href={moreLink}>{moreText}</a>}
		</RootWrapper>
	)
})

AreaHeaderV2.displayName = 'AreaHeaderV2'

export default AreaHeaderV2
