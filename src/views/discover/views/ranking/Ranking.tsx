import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Ranking: FC<IProps> = memo(props => {
  return <div>Ranking</div>
})

Ranking.displayName = 'Ranking'

export default Ranking
