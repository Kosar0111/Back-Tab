import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IUser } from '../model/interfaceUser'

interface IUsersSlice {
  users: IUser[]
  loading: boolean
  error: boolean
  message: string
}

const initialState: IUsersSlice = {
  loading: false,
  error: false,
  message: '',
  users: []
}

export const getGoods = createAsyncThunk('users/getUsers', async (_) => {
  const response = await axios.get<IUser[]>('http://localhost:3001/users')
  return response.data
})
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGoods.pending, (state) => {
      state.loading = true
      state.error = false
      state.users = []
    })
    builder.addCase(getGoods.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      usersSlice.caseReducers.allUsers(state, action)
    })
    builder.addCase(getGoods.rejected, (state) => {
      state.loading = false
      state.error = true
      state.message = 'Что то пошло не так'
    })
  }
})

export const { allUsers } = usersSlice.actions
export default usersSlice.reducer
