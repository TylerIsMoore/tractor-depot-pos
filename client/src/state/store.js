import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import transaction from './reducers/transaction';
const store = configureStore({
    reducer: {
        auth,
        transaction,
    },
});

export default store;
