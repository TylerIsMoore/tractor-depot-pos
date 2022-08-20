import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import authService from '../../api/auth';
import getErrorMessage from '../../utils/getErrorMessage';

const tokenFromStorage = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;

const userFromStorage =
    typeof tokenFromStorage === 'string' ? jwtDecode(tokenFromStorage) : null;

const initialState = {
    currentUser: userFromStorage ?? null,
    isAuthenticated: !!tokenFromStorage,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ employeeId, password }, thunkApi) => {
        try {
            const data = await authService.login(employeeId, password);

            if (data.accessToken) {
                localStorage.setItem('userToken', data.accessToken);
            }

            return jwtDecode(data.accessToken);
        } catch (err) {
            const msg = getErrorMessage(err);

            console.log(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        signout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('userToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { signout, resetError } = authSlice.actions;

export default authSlice.reducer;
