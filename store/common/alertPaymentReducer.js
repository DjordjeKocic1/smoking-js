import { createSlice } from "@reduxjs/toolkit";

const alertPaymentSlice = createSlice({
  name: "alertPayment",
  initialState: {
    alertMsg: null,
    isVisible: false,
    isModalVisible: false,
    isSuccessPayment: false,
    isLoading: false,
  },
  reducers: {
    successPayment: (state) => {
      state.alertMsg = "Payment was successfull";
      state.isVisible = true;
      state.isSuccessPayment = true;
      state.isModalVisible = false;
    },
    cancelPayment: (state) => {
      state.alertMsg = "Payment was canceled";
      state.isVisible = true;
      state.isSuccessPayment = false;
    },
    hide: (state) => {
      state.alertMsg = null;
      state.isVisible = false;
      state.isSuccessPayment = false;
    },
    paymentModalShow: (state, action) => {
      state.isModalVisible = action.payload;
    },
    paymentLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  successPayment,
  cancelPayment,
  hide,
  paymentModalShow,
  paymentLoading,
} = alertPaymentSlice.actions;

export const selectAlert = (state) => state.alertPayment;
export default alertPaymentSlice.reducer;
