// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {API_URL} from '../configs/Contants'
import axios from 'axios'

axios.defaults.baseURL = API_URL


const initialStates = () => {
  const item = {
    marketPlaceAddress: '',
    soldTickets: 0,
    maxTickets: 0,
    ticketPrice: 0,
    ticketName: '',
    ticketSymbol: '',
    contractOwner: '',
    ticketAddress: ''
  }
  return item
}

export const getContractData = createAsyncThunk('common/get-contract-data',async (data) => {
    const response = await axios.post('/api/contract/get-contract-data', data)
    return response.data.data ? {...response.data.data, ...data} : initialStates()
})

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    contractData: initialStates()
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContractData.fulfilled, (state, action) => {
        state.contractData = action.payload
      })
  }
})

export const { } = commonSlice.actions

export default commonSlice.reducer
