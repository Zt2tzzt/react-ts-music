import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper, { BarControl, BarPlayerInfo, BarOperator } from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { getSongPlayUrl } from '@/utils/format'
import { useAppSelector } from '@/store'
import { shallowEqual, useDispatch } from 'react-redux'

interface IProps {
	children?: ReactNode
}
const AppPlayerBar: FC<IProps> = memo(() => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progressm, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [isSliding, setIsSliding] = useState(false)

	const audioRef = useRef<HTMLAudioElement>(null)

	const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
		state => ({
			currentSong: state.player.currentSong,
			lyrics: state.player.lyrics,
			lyricIndex: state.player.lyricIndex,
			playMode: state.player.playMode
		}),
		shallowEqual
	)

	const dispatch = useDispatch()
	useEffect(() => {
		if (!audioRef.current) return
		if (!('id' in currentSong && currentSong.id)) return

		// 播放音乐
		audioRef.current.src = getSongPlayUrl(currentSong.id)
		audioRef.current
			.play()
			.then(() => {
				setIsPlaying(true)
				console.log('歌曲播放成功')
			})
			.catch(err => {
				setIsPlaying(false)
				console.log('歌曲播放失败:', err)
			})

		// 设置音乐总时长
		setDuration(currentSong.dt)
	}, [currentSong])

	return (
		<RootWrapper className='sprite_playbar'>
			<div className='content wrap_v2'>
				<BarControl isPlaying={isPlaying}>
					<button className='btn sprite_playbar prev'></button>
					<button className='btn sprite_playbar play'></button>
					<button className='btn sprite_playbar next'></button>
				</BarControl>
				<BarPlayerInfo>
					<Link to='/player'>
						<img className='image' src='' alt='' />
					</Link>
					<div className='info'>
						<div className='song'>
							<span className='song-name'>哈哈哈</span>
							<span className='singer-name'>呵呵呵</span>
						</div>
						<div className='progress'>
							{/* Slider 组件 */}
							<Slider step={0.5} value={20} tooltip={{ formatter: null }}></Slider>
							<div className='time'>
								<span className='current'>66:66</span>
								<span className='divider'>/</span>
								<span className='duration'>55:44</span>
							</div>
						</div>
					</div>
				</BarPlayerInfo>
				<BarOperator playMode={playMode}>
					<div className='left'>
						<button className='btn pip'></button>
						<button className='btn sprite_playbar favor'></button>
						<button className='btn sprite_playbar share'></button>
					</div>
					<div className='right sprite_playbar'>
						<button className='btn sprite_playbar volume'></button>
						<button className='btn sprite_playbar loop'></button>
						<button className='btn sprite_playbar playlist'></button>
					</div>
				</BarOperator>
			</div>
			<audio ref={audioRef}></audio>
		</RootWrapper>
	)
})

AppPlayerBar.displayName = 'AppPlayerBar'

export default AppPlayerBar
