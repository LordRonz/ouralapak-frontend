import { createSlice } from '@reduxjs/toolkit';

import productData from '@/data/productData';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: productData,
    specificItem: productData[0],
  },
  reducers: {
    specificProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        state.specificItem = product;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { specificProduct } = productSlice.actions;

export default productSlice.reducer;
