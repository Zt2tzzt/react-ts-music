import { configureStore } from '@reduxjs/toolkit'
import counter from './features/counter'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {
		counter: counter
	}
})

export type StateType = ReturnType<typeof store.getState>
export const useSelectorWithStateType: TypedUseSelectorHook<StateType> = useSelector

export default store
