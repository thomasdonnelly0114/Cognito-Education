import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { Product, ProductState } from '../../types'

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>(`${process.env.REACT_APP_API_BASE_URL}/products.json`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default productSlice.reducer;