import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/auth.reducer';
import {
  performAction,
  getBattleState,
} from '../../store/actions/battle.actions';
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    margin: '1rem',
    color: '#444',
    display: 'flex',
    flexDirection: 'row',
  },
  skillBar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    justifyContent: 'space-between',
  },
  actionLog: {
    marginTop: '1rem',
    marginLeft: 'auto',
    width: '300px',
  },
  actionButton: {
    margin: '0.5rem 0',
  },
});

const Battle1v1: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(selectAuth);
  const [battleState, setBattleState] = useState<any>(null);
  const [actionLog, setActionLog] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (auth && id) {
      dispatch(getBattleState(id))
        .unwrap()
        .then((response) => {
          setBattleState(response);
          setActionLog(response.actions);
        })
        .catch((error) => console.log(error));
    }
  }, [auth, id, dispatch]);

  const handleAction = (actionType: 'heal' | 'attack' | 'pass') => {
    // Explicitly type actionType

    if (!auth || !id) return; // Ensure auth and id are available

    const actionValue = actionType === 'heal' ? 3 : 5;
    dispatch(
      performAction({
        battleId: id,
        playerId: auth.charId,
        actionType,
        value: actionValue,
      })
    )
      .unwrap()
      .then((response) => {
        setBattleState(response);
        setActionLog(response.actions);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.skillBar}>
        <Button
          className={classes.actionButton}
          onClick={() => handleAction('heal')}
        >
          Heal
        </Button>
        <Button
          className={classes.actionButton}
          onClick={() => handleAction('attack')}
        >
          Attack
        </Button>
        <Button
          className={classes.actionButton}
          onClick={() => handleAction('pass')}
        >
          Pass
        </Button>
      </Box>
      <Box className={classes.actionLog}>
        <Typography variant="h6">Action Log</Typography>
        <List>
          {actionLog.map((action, index) => {
            let actionText;

            // construct a text based on actionType with switch statement
            switch (action.actionType) {
              case 'heal':
                actionText = `Healed ${action.value} HP`;
                break;
              case 'attack':
                actionText = `Damaged ${action.value} HP`;
                break;
              case 'pass':
                actionText = 'Passed';
                break;
              default:
                actionText = 'Unknown action';
            }

            return <ListItem key={index}>{actionText}</ListItem>;
          })}
        </List>
      </Box>
    </Container>
  );
};

export default Battle1v1;

