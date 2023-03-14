import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ISong, ILyricParse } from '@/types'
import type { StateType } from '../../index'
import { getSongDetail, getSongLyric } from '@/service/features/play/play'
import { parseLyric } from '@/utils/format'

export enum PLAY_MODE {
	ORDER,
	RANDOM,
	circulation
}

const initialState: {
	currentSong: ISong | object
	lyrics: ILyricParse[]
	lyricIndex: number
	playSongList: ISong[]
	playSongIndex: number
	playMode: PLAY_MODE
} = {
	currentSong: {},
	lyrics: [],
	lyricIndex: -1,
	playSongList: [],
	playSongIndex: -1,
	playMode: PLAY_MODE.ORDER
}

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		changeCurrentSongAction(state, { payload }) {
			state.currentSong = payload
		},
		changeLyricsAction(state, { payload }) {
			state.lyrics = payload
		},
		changeLyricIndexongAction(state, { payload }) {
			state.lyricIndex = payload
		},
		changePlaySongIndexAction(state, { payload }) {
			state.playSongIndex = payload
		},
		changePlaySongListAction(state, { payload }) {
			state.playSongList = payload
		},
		changePlayModeAction(state, { payload }) {
			state.playMode = payload
		}
	}
})

export const {
	changeCurrentSongAction,
	changeLyricsAction,
	changeLyricIndexongAction,
	changePlaySongIndexAction,
	changePlaySongListAction,
	changePlayModeAction
} = playerSlice.actions

export default playerSlice.reducer

export const fetchCurrentSongAction = createAsyncThunk<void, number, { state: StateType }>(
	'currentSong',
	(id, { dispatch, getState }) => {
		// 播放歌曲，分两种情况
		const playSongList = getState().player.playSongList
		const index = playSongList.findIndex(item => item.id === id)
		if (index === -1) {
			// 歌曲不在播放列表中
			getSongDetail(id).then(res => {
				if (!res.songs.length) return
				const song = res.songs[0]

				const newPlaySongList = [...playSongList, song]
				dispatch(changeCurrentSongAction(song))
				dispatch(changePlaySongListAction(newPlaySongList))
				dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
			})
		} else {
			// 歌曲已在播放列表中，从列表中取出该歌曲。
			const song = playSongList[index]
			dispatch(changeCurrentSongAction(song))
			dispatch(changePlaySongListAction(index))
		}

		getSongLyric(id).then(res => {
			const lyricString = res.lrc.lyric
			const lyrics = parseLyric(lyricString) // 歌词解析
			dispatch(changeLyricsAction(lyrics))
		})
	}
)
