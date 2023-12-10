import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import productappreducer from "./features/product-slice";
import toastappreducer from "./features/toast-slice";
import productdetailappreducer from "./features/product-details-slice";

export const store = configureStore({
  reducer: {
    productappreducer,
    toastappreducer,
    productdetailappreducer,
  },
});

export const useAppSelector = useSelector;
