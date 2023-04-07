import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Download: FC<IProps> = memo(props => {
  return <div>Download</div>
})

Download.displayName = 'Download'

export default Download
