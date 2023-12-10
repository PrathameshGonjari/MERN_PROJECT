import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { messages } from "@constants/messages";

const initialState = {
  isLoading: false,
  product: [],
  productCount: 0,
  error: "",
};

export const getProducts = createAsyncThunk(
  "productList/getProducts",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/products`);
      console.log("response: ", response);
      if (response.status !== 200) {
        return { data: {}, success: false, message: messages.DEFAULT };
      }
      return response?.data;
    } catch (err) {
      const error = err?.response?.data?.error;
      return {
        data: {},
        success: false,
        message: error || err.message || messages.DEFAULT,
      };
    }
  }
);

const productListSlice = createSlice({
  name: "productList",
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      const updatedData = action.payload;

      if (!updatedData.success) {
        state.product = initialState.product;
        state.isLoading = initialState.isLoading;
        state.error = updatedData?.message;
        return;
      }

      state.product = updatedData?.products;
      state.productCount = updatedData?.productCount;
      state.isLoading = false;
    },
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.rejected]: (state) => {
      state.product = initialState.product;
      state.isLoading = initialState.isLoading;
      state.error = messages.DEFAULT;
    },
  },
});

export default productListSlice.reducer;
