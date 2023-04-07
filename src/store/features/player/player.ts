import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ISong, ILyricParse } from '@/types'
import type { StateType } from '../../index'
import { getSongDetail, getSongLyric } from '@/service/features/play/play'
import { parseLyric } from '@/utils/format'

export enum PLAY_MODE {
  ORDER,
  RANDOM,
  CIRCULATION
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

const FetchSongLyricAction = createAsyncThunk<void, number>(
  'FetchSongLyricAction',
  (id, { dispatch }) => {
    getSongLyric(id).then(res => {
      const lyricString = res.lrc.lyric
      const lyrics = parseLyric(lyricString) // 歌词解析
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IThunkState {
  state: StateType
}

export const playTheMusicAction = createAsyncThunk<void, number, IThunkState>(
  'playTheMusicAction',
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

    // 歌词获取
    dispatch(FetchSongLyricAction(id))
  }
)

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changeMusic',
  (isNext: boolean, { dispatch, getState }) => {
    // 获取 state 中的数据
    const { playMode, playSongIndex, playSongList } = getState().player

    // 递归函数，用于随机播放时，获取歌曲索引
    const _getDiffRandomNumber = (): number => {
      const length = playSongList.length
      const random = Math.floor(Math.random()) * length
      return random === playSongIndex && length > 1 ? _getDiffRandomNumber() : random
    }

    // 根据播放模式，切换歌曲
    let newIndex: number
    switch (playMode) {
      case PLAY_MODE.RANDOM: // 随机播放
        newIndex = _getDiffRandomNumber()
        break
      default:
        newIndex = isNext ? playSongIndex + 1 : playSongIndex - 1
        // 边界判断
        if (newIndex > playSongList.length - 1) newIndex = 0
        if (newIndex < 0) newIndex = playSongList.length - 1
        break
    }

    // 歌曲变更
    const song = playSongList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    // 请求新的歌词
    dispatch(FetchSongLyricAction(song.id))
  }
)
