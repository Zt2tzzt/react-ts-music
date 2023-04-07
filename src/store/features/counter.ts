import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DirectionType = 'left' | 'right' | 'down' | 'up'

interface IState {
  count: number
  message: string
  address: string
  height: number
  direction: DirectionType
}

const initialState: IState = {
  count: 100,
  message: 'hello redux',
  address: '深圳市',
  height: 1.88,
  direction: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload
    }
  }
})

export const { changeMessageAction } = counterSlice.actions
export default counterSlice.reducer
