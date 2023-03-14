import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper, { BarControl, BarPlayerInfo, BarOperator } from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { getImageSize, getSongPlayUrl } from '@/utils/format'
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
		console.log('haha')

		if (!audioRef.current) return
		if (!('id' in currentSong && currentSong.id)) return
		console.log('hehe')

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

	// 上一首，播放/暂停，下一首
	const onPreClick = () => {}

	const onNextClick = () => {}

	const onPlayPauseClick = () => {}

	// Slider
	const onSliderChanging = () => {}

	const onSliderChanged = () => {}

	return (
		<RootWrapper className='sprite_playbar'>
			<div className='content wrap_v2'>
				<BarControl isPlaying={isPlaying}>
					<button className='btn sprite_playbar prev' onClick={() => onPreClick()}></button>
					<button className='btn sprite_playbar play' onClick={() => onPlayPauseClick()}></button>
					<button className='btn sprite_playbar next' onClick={() => onNextClick()}></button>
				</BarControl>
				<BarPlayerInfo>
					<Link to='/player'>
						<img
							className='image'
							src={getImageSize(
								'al' in currentSong
									? currentSong.al.picUrl
									: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg',
								50
							)}
							alt=''
						/>
					</Link>
					<div className='info'>
						<div className='song'>
							<span className='song-name'>{'name' in currentSong ? currentSong.name : ''}</span>
							<span className='singer-name'>
								{'ar' in currentSong ? currentSong.ar[0].name : ''}
							</span>
						</div>
						<div className='progress'>
							{/* Slider 组件 */}
							<Slider
								step={0.5}
								value={progressm}
								tooltip={{ formatter: null }}
								onChange={onSliderChanging}
								onAfterChange={onSliderChanged}
							></Slider>
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
