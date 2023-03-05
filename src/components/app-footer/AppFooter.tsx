import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
	children?: ReactNode
}
const AppFooter: FC<IProps> = memo(() => {
	return <div>AppFooter</div>
})

AppFooter.displayName = 'AppFooter'

export default AppFooter
