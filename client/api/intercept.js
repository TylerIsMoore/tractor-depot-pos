import { signout } from '../state/reducers/auth';

const intercept = (apiClient, store) => {
    apiClient.interceptors.request.use((config) => {
        const token = localStorage.getItem('userToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem('userToken');
                store.dispatch(signout());
            }
            return Promise.reject(error);
        }
    );
};

export default intercept;
