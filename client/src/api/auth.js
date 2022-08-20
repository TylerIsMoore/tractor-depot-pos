import jwtDecode from 'jwt-decode';
import apiClient from './client';

/**
 *
 * @param {String} employeeId
 * @param {String} password
 */
const login = async (employeeId, password) => {
    const resp = await apiClient.post('/auth/login', {
        employeeId,
        password,
    });

    return resp.data;
};

const authService = {
    login,
};

export default authService;
