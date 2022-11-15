import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import * as AUTH_ACTIONS from './store/actions/auth.actions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Apps/Auth/Login/Login';
import Counter from './Apps/Counter/Counter';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(AUTH_ACTIONS.authCheckState());
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

