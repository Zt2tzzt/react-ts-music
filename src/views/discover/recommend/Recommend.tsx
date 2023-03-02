import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
	children?: ReactNode
}
const Recommend: FC<IProps> = memo(props => {
	return <div>Recommend</div>
})

Recommend.displayName = 'Recommend'

export default Recommend
