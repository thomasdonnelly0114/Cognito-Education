import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
