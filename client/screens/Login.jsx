import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, resetError, signout } from '../state/reducers/auth';

const Login = () => {
    const [employeeId, updateEmployeeId] = useState('');
    const [password, updatePassword] = useState('');

    const dispatch = useDispatch();

    const { isAuthenticated, error, currentUser } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/pos');
        }

        return () => {
            dispatch(resetError());
        };
    }, [isAuthenticated]);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(
            loginAsync({
                employeeId,
                password,
            })
        );
    };

    return (
        <div>
            <div>{error}</div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="employeeId">Employee Id</label>
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => updateEmployeeId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => updatePassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
