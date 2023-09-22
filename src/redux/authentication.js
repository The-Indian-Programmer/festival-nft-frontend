// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../configs/Contants'

axios.defaults.baseURL = API_URL

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  return item ? JSON.parse(item) : {}
}

export const getMyTicketList = createAsyncThunk('authentication/getUserTickets', async (payload) => {
  const response = await axios.post(`/api/ticket/user`, payload);
  return response.data
})

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    userTickets: []
  },
  reducers: {
    handleWalletConnect: (state, action) => {
      state.userData = action.payload
      let userData = JSON.stringify(action.payload)
      localStorage.setItem('userData', userData)
    },
    handleWalletDisconnect: (state, action) => {
      state.userData = {}
      localStorage.removeItem('userData')
    }
  },
  extraReducers: builder => {
    builder.addCase(getMyTicketList.fulfilled, (state, action) => {
      state.userTickets = action.payload.data
    })
  }
})

export const { handleWalletConnect, handleWalletDisconnect } = authSlice.actions

export default authSlice.reducer
