// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../../configs/Contants'

axios.defaults.baseURL = API_URL

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  return item ? JSON.parse(item) : {}
}

export const getAllListedTicket = createAsyncThunk('tickets/getAllListedTicket', async (payload) => {
  const response = await axios.post(`/api/ticket/all-listed`, payload);
  return response.data
})

export const authSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: []
  },
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getAllListedTicket.fulfilled, (state, action) => {
      state.tickets = action.payload.data
    })
  }
})

export const {} = authSlice.actions

export default authSlice.reducer
