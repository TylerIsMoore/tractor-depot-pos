import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../api/product';
import getErrorMessage from '../../utils/getErrorMessage';

const initialState = {
    customer: null,
    products: [],
    subtotal: 0,
    error: null,
};

export const searchSkuAsync = createAsyncThunk(
    'transaction/searchSkuAsync',
    async (sku, thunkApi) => {
        try {
            const data = await productService.search(sku);

            return data;
        } catch (err) {
            const msg = getErrorMessage(err);

            console.log(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        reset: (state) => {
            state.customer = null;
            state.products = [];
            state.subtotal = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchSkuAsync.fulfilled, (state, action) => {
                state.products = [...state.products, action.payload];
                state.subtotal += Number(action.payload.price);
                state.error = null;
            })
            .addCase(searchSkuAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { reset } = transactionSlice.actions;

export default transactionSlice.reducer;
