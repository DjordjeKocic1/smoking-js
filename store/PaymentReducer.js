import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isPaymentModalVisible: false,
    isLoading: false,
  },
  reducers: {
    paymentModalShow: (state, action) => {
      state.isPaymentModalVisible = action.payload;
    },
    paymentLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { paymentModalShow, paymentLoading } = paymentSlice.actions;

export const selectPayment = (state) => state.payment;
export default paymentSlice.reducer;
