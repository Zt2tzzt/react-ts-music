import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IBanner, IPersonalized, IAlbum, IPlaylist, IArtist } from '@/types'
import {
  getArtistList,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPopularRankingList
} from '@/service/features/discover/recommend'

const initialState: {
  banners: IBanner[]
  hotRecommends: IPersonalized[]
  newAlbum: IAlbum[]
  popularRankings: IPlaylist[]
  settleSingers: IArtist[]
} = {
  banners: [],
  hotRecommends: [],
  newAlbum: [],
  popularRankings: [],
  settleSingers: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }: PayloadAction<IBanner[]>) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }: PayloadAction<IPersonalized[]>) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }: PayloadAction<IAlbum[]>) {
      state.newAlbum = payload
    },
    changePopularRankingsAction(state, { payload }: PayloadAction<IPlaylist[]>) {
      state.popularRankings = payload
    },
    changeSettleSingersAction(state, { payload }: PayloadAction<IArtist[]>) {
      state.settleSingers = payload
    }
  }
})

export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction,
  changePopularRankingsAction,
  changeSettleSingersAction
} = recommendSlice.actions
export default recommendSlice.reducer

export const fetchRecommendDataAction = createAsyncThunk(
  'recommendDdata',
  (param, { dispatch }) => {
    getBanners().then(res => {
      console.log('banners res:', res)
      dispatch(changeBannersAction(res.banners))
    })
    getHotRecommend(8).then(res => {
      console.log('hotRecommends res:', res)
      dispatch(changeHotRecommendsAction(res.result))
    })
    getNewAlbum().then(res => {
      console.log('newAlbums res:', res)
      dispatch(changeNewAlbumsAction(res.albums))
    })

    // 榜单
    const rankingIds = [19723756, 3779629, 2884035]
    Promise.all(rankingIds.map(id => getPopularRankingList(id))).then(ress => {
      const res = ress.map(res => res.playlist)
      console.log('popular ranking res:', res)
      dispatch(changePopularRankingsAction(res))
    })

    getArtistList(5).then(res => {
      console.log('artist res:', res)
      dispatch(changeSettleSingersAction(res.artists))
    })
  }
)

/* export const fetchBannerDataAction = createAsyncThunk('banners', (param, { dispatch }) => {
	getBanners().then(res => {
		console.log('banners res:', res)
		dispatch(changeBannersAction(res.banners))
	})
})

export const fetchHotRecommendsAction = createAsyncThunk('hotRecommends', (param, { dispatch }) => {
	getHotRecommend(8).then(res => {
		console.log('hotRecommends res:', res)
		dispatch(changeHotRecommendsAction(res.result))
	})
})

export const fetchNewAlbumsAction = createAsyncThunk('newAlbums', (param, { dispatch }) => {
	getNewAlbum().then(res => {
		console.log('newAlbums res:', res)
		dispatch(changeNewAlbumsAction(res.albums))
	})
}) */
