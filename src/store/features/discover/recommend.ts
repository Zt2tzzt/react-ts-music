import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IBanner } from '@/types'
import { getBanners } from '@/service/features/discover/recommend'

const initialState: {
	banners: IBanner[]
} = {
	banners: []
}

const recommendSlice = createSlice({
	name: 'recommend',
	initialState,
	reducers: {
		changeBannersAction(state, { payload }) {
			state.banners = payload
		}
	}
})

export const fetchBannerDataAction = createAsyncThunk('banners', (param, { dispatch }) => {
	getBanners().then(res => {
		console.log('banners res:', res)
		dispatch(changeBannersAction(res.banners))
	})
})

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
