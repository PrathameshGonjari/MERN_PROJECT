import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { messages } from "@constants/messages";

const initialState = {
  isLoading: false,
  product: [],
  error: "",
};

export const getProductDetails = createAsyncThunk(
  "productDetails/getProducts",
  async (id) => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/${id}`);

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
  name: "productDetails",
  initialState,
  extraReducers: {
    [getProductDetails.fulfilled]: (state, action) => {
      const updatedData = action.payload;

      if (!updatedData.success) {
        state.product = initialState.product;
        state.isLoading = initialState.isLoading;
        state.error = updatedData?.message;
        return;
      }

      state.product = updatedData?.product;
      state.isLoading = false;
    },
    [getProductDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductDetails.rejected]: (state) => {
      state.product = initialState.product;
      state.isLoading = initialState.isLoading;
      state.error = messages.DEFAULT;
    },
  },
});

export default productListSlice.reducer;
