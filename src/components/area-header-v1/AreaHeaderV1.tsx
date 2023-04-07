import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  titleText?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}
const AreaHeaderV1: FC<IProps> = memo(props => {
  const { titleText = '默认标题', keywords = [], moreText = '更多', moreLink = '/' } = props

  return (
    <RootWrapper className='sprite_02'>
      <div className='left'>
        <h3 className='title'>{titleText}</h3>
        <div className='keywords'>
          {keywords.map(item => (
            <div className='item' key={item}>
              <Link className='link' to={moreLink} target='_blank'>
                {item}
              </Link>
              <span className='divider'>|</span>
            </div>
          ))}
        </div>
      </div>
      <div className='right'>
        <Link className='more' to={moreLink} target='_blank'>
          {moreText}
        </Link>
        <i className='sprite_02 icon'></i>
      </div>
    </RootWrapper>
  )
})

AreaHeaderV1.displayName = 'AreaHeaderV1'

export default AreaHeaderV1
