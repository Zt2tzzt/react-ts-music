import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IBanner, IPersonalized, IAlbum, IPlaylist } from '@/types'
import {
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
} = {
	banners: [],
	hotRecommends: [],
	newAlbum: [],
	popularRankings: []
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
		}
	}
})

export const {
	changeBannersAction,
	changeHotRecommendsAction,
	changeNewAlbumsAction,
	changePopularRankingsAction
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
