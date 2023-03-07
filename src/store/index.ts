import { configureStore } from '@reduxjs/toolkit'
import counter from './features/counter'
import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import recommend from './features/discover/recommend'

const store = configureStore({
	reducer: {
		counter: counter,
		recommend: recommend
	}
})

type StateType = ReturnType<typeof store.getState>
type DispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch

export default store
