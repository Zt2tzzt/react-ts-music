import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
	children?: ReactNode
}
const Discover: FC<IProps> = memo(props => {
	return <div>Discover</div>
})

Discover.displayName = 'Discover'

export default Discover
