import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<Product>) {
      const product = action.payload;
      state = { ...state, items: [...state.items, product] };
      return state;
    },
  },
});

export const { addToBasket } = basketSlice.actions;
export default basketSlice.reducer;
