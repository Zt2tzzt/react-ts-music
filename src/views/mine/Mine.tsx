import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Mine: FC<IProps> = memo(props => {
  return <div>Mine</div>
})

Mine.displayName = 'Mine'

export default Mine
