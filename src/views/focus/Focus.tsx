import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Focus: FC<IProps> = memo(props => {
  return <div>Focus</div>
})

Focus.displayName = 'Focus'

export default Focus
