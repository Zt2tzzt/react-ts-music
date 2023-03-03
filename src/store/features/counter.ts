import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 100,
		message: 'hello redux',
		address: '深圳市',
		height: 1.88
	},
	reducers: {
		changeMessageAction(state, { payload }) {
			state.message = payload
		}
	}
})

export const { changeMessageAction } = counterSlice.actions
export default counterSlice.reducer
