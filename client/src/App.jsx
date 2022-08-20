import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import POS from './screens/POS';
import ProtectedWrapper from './components/ProtectedWrapper';
import Header from './components/Header/Header';
import Pay from './screens/Pay';
import intercept from './api/intercept';
import apiClient from './api/client';
import store from './state/store';

intercept(apiClient, store);

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" index element={<Login />} />
                    <Route
                        path="/pos"
                        element={
                            <ProtectedWrapper>
                                <POS />
                            </ProtectedWrapper>
                        }
                    />
                    <Route
                        path="/pay"
                        element={
                            <ProtectedWrapper>
                                <Pay />
                            </ProtectedWrapper>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
