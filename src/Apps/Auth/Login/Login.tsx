import React, { FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as AUTH_ACTIONS from '../../../store/actions/auth.actions';
import IAuth from '../../../Shared/models/Auth/IAuth';

import { useSelector } from 'react-redux';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useSelector<any, IAuth>((state) => state.auth.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth && auth.token && auth.userId) {
            navigate('/dashboard');
        }
    }, [auth]);

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const loginHandler = (e: FormEvent): void => {
        console.log('das ist login handler')
        e.preventDefault();
        if (email && password) {
            // dispatch(AUTH_ACTIONS.auth(email, password));
        }
    };

    return (
        <div>
            <h1>Sign in</h1>
            <form noValidate onSubmit={loginHandler}>
                <input
                    required
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={emailChangeHandler}
                />
                <input
                    required
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={passwordChangeHandler}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;

