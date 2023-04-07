import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const AppFooter: FC<IProps> = memo(() => {
  return <div style={{ marginBottom: '62px' }}>AppFooter</div>
})

AppFooter.displayName = 'AppFooter'

export default AppFooter
