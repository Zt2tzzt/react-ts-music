import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Djradio: FC<IProps> = memo(props => {
  return <div>Djradio</div>
})

Djradio.displayName = 'Djradio'

export default Djradio
