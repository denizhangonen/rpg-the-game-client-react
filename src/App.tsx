import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import * as AUTH_ACTIONS from './store/actions/auth.actions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectAuth } from './store/reducers/auth.reducer';

import IAuth from './Shared/models/Auth/IAuth';

import Login from './Apps/Auth/Login/Login';
import Counter from './Apps/Counter/Counter';
import Game from './Apps/Game/Game';

function App() {
    const [authState, setAuthState] = useState<undefined | IAuth>(undefined);
    const { auth } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (auth) {
            console.log('selectedAut is updated :', auth);
            //setAuth(selectAuth);
        }
        // dispatch(AUTH_ACTIONS.authCheckState());
    }, [auth]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/game" element={<Game />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

