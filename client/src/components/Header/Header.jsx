import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../state/reducers/auth';
import './Header.css';

const Header = () => {
    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <header className="App__Header">
            {isAuthenticated ? (
                <div>
                    <div>{currentUser?.name}</div>
                    <div>
                        <button onClick={() => dispatch(signout())}>
                            Signout
                        </button>
                    </div>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
