import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/auth.reducer';
import { selectChar } from '../../store/reducers/game.reducer';
import { getChar } from '../../store/actions/game.actions';

import { Box, Card, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        margin: '1rem',
        color: '#444',
    },
    card: {
        padding: '1rem',
        marginTop: '2rem',
        ' & div': {
            color: '#444',
            maxWidth: '160px',
        },
    },
});

interface GameProps {}

const Game: React.FC<GameProps> = (props) => {
    const { auth } = useAppSelector(selectAuth);
    const char = useAppSelector(selectChar);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const classes = useStyles();

    useEffect(() => {
        if (auth) {
            dispatch(getChar({ userId: auth.userId }));
        }
    }, []);

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        }
    }, [auth]);

    useEffect(() => {
        console.log('selectedChar is updated :', char);
    }, [char]);

    return (
        <Container className={classes.root}>
            {char && (
                <Box>
                    <Typography variant="h4">Hola, {char.name}</Typography>
                    <Typography variant="h6">
                        Esta es tu casa, {char.name}, y, este un game muy
                        fantastico.
                    </Typography>

                    <Card className={classes.card} elevation={4}>
                        <Box>
                            <Typography variant="h5">{char.name}</Typography>
                        </Box>
                        <Box>LVL : {char.level}</Box>
                        <Box>class : {char.class}</Box>
                        <Box>Gold : {char.gold}</Box>
                        <Box>Status : {char.status}</Box>
                    </Card>
                </Box>
            )}
        </Container>
    );
};

export default Game;

