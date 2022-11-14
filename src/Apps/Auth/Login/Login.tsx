import React, { FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as AUTH_ACTIONS from '../../../store/actions/auth.actions';
import IAuth from '../../../Shared/models/Auth/IAuth';

import {
    TextField,
    Card,
    Container,
    Box,
    Button,
    Grid,
    Link,
    FormControlLabel,
    Checkbox,
    Typography,
    CssBaseline,
    Avatar,
} from '@mui/material';
import { makeStyles, createStyles, Theme } from '@mui/styles';

import { useSelector } from 'react-redux';

import LockOutlinedIcon from '@mui/material/Icon';

interface LoginProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        formElement: {
            padding: theme.spacing(4),
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

const Login: React.FC<LoginProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useSelector<any, IAuth>((state) => state.auth.auth);

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('Login');

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
        e.preventDefault();
        if (email && password) {
            dispatch(AUTH_ACTIONS.auth(email, password));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={loginHandler}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={emailChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
        // <Container className={classes.root}>
        //   <Card className={classes.form}>
        //     <Box className={classes.formElement}>
        //       Email
        //       <TextField />
        //     </Box>
        //     <Box className={classes.formElement}>
        //       Password
        //       <TextField />
        //     </Box>
        //     <Button>Send</Button>
        //   </Card>
        // </Container>
    );
};

export default Login;

