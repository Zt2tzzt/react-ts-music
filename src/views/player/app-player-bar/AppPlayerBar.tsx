import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import RootWrapper, { BarControl, BarPlayerInfo, BarOperator } from './style'
import { Link } from 'react-router-dom'
import { message, Slider } from 'antd'
import { getImageSize, getSongPlayUrl, formatMillisecond } from '@/utils/format'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import {
	changeLyricIndexongAction,
	changeMusicAction,
	changePlayModeAction
} from '@/store/features/player/player'
import { PLAY_MODE } from '@/store/features/player/player'

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

	useEffect(() => {
		if (!audioRef.current) return
		if (!('id' in currentSong && currentSong.id)) return

		// 播放音乐
		audioRef.current.src = getSongPlayUrl(currentSong.id)
		audioRef.current
			.play()
			.then(() => {
				setIsPlaying(true)
			})
			.catch(err => {
				setIsPlaying(false)
				console.log('歌曲播放失败:', err)
			})

		// 设置音乐总时长
		setDuration(currentSong.dt)
	}, [currentSong])

	const dispatch = useAppDispatch()

	const musicChange = (isNext = true) => {
		dispatch(changeMusicAction(isNext))
	}

	// 上一首，播放/暂停，下一首
	const onPreClick = () => {
		musicChange(false)
	}

	const onPlayPauseClick = () => {
		isPlaying
			? audioRef.current?.pause()
			: audioRef.current?.play().catch(err => {
					setIsPlaying(false)
					console.log('播放出错 err:', err)
			  })
		setIsPlaying(!isPlaying)
	}

	const onNextClick = () => {
		musicChange(true)
	}

	// Slider
	const onSliderChanging = useCallback(
		(value: number) => {
			setIsSliding(true)
			setProgress(value)
			setCurrentTime((value / 100) * duration)
		},
		[duration]
	)

	const onSliderChanged = useCallback(
		(value: number) => {
			const currentTime = (value / 100) * duration
			if (audioRef.current) audioRef.current.currentTime = currentTime / 1000

			setProgress(value)
			setCurrentTime(currentTime)
			setIsSliding(false)
		},
		[duration]
	)

	// ModeChange
	const onModeChangeClick = () => {
		let newPlayMode = playMode + 1
		if (newPlayMode > 2) newPlayMode = 1
		dispatch(changePlayModeAction(newPlayMode))
	}

	// Audio
	const onAudioTimeUpdate = () => {
		// 获取当歌曲播放前时间
		if (!audioRef.current) return
		const currentTime = audioRef.current.currentTime * 1000

		// 计算当前歌曲播放进度
		if (!isSliding) {
			const progress = (currentTime / duration) * 100
			setProgress(progress)
			setCurrentTime(currentTime)
		}

		// 匹配歌词
		const findIndex = lyrics.findIndex(item => item.time > currentTime)
		const index = findIndex === -1 ? lyrics.length - 1 : findIndex
		if (lyricIndex === index) return
		dispatch(changeLyricIndexongAction(index))

		// 展示歌词
		message.open({
			content: lyrics[index].text,
			key: 'lyric',
			duration: 0
		})
	}

	const onAudioEnded = () => {
		switch (playMode) {
			case PLAY_MODE.CIRCULATION: // 单去循环
				if (audioRef.current) audioRef.current.currentTime = 0
				break
			default:
				musicChange(true)
				break
		}
	}

	return (
		<RootWrapper className='sprite_playbar'>
			<div className='content wrap_v2'>
				<BarControl isPlaying={isPlaying}>
					<button className='btn sprite_playbar prev' onClick={onPreClick}></button>
					<button className='btn sprite_playbar play' onClick={onPlayPauseClick}></button>
					<button className='btn sprite_playbar next' onClick={onNextClick}></button>
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
								<span className='current'>{formatMillisecond(currentTime)}</span>
								<span className='divider'>/</span>
								<span className='duration'>{formatMillisecond(duration)}</span>
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
						<button className='btn sprite_playbar loop' onClick={onModeChangeClick}></button>
						<button className='btn sprite_playbar playlist'></button>
					</div>
				</BarOperator>
			</div>

			{/* 音频播放器 audio */}
			<audio ref={audioRef} onTimeUpdate={onAudioTimeUpdate} onEnded={onAudioEnded}></audio>
		</RootWrapper>
	)
})

AppPlayerBar.displayName = 'AppPlayerBar'

export default AppPlayerBar
