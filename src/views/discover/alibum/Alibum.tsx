import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
	children?: ReactNode
}
const Alibum: FC<IProps> = memo(props => {
	return <div>Alibum</div>
})

Alibum.displayName = 'Alibum'

export default Alibum
