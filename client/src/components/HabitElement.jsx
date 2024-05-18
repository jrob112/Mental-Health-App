import React from 'react';
import axios from 'axios';
import { Card, CardContent, Fab, Typography, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styleRedButton } from './styles';
import { green, orange } from '@mui/material/colors';

export default function HabitElement({ habit, getAllHabits }) {
  const orangeColor = orange[200];
  const updateHabit = () => {
    axios
      .patch(`/api/${habit.id}/habits`, {
        goal: habit.goal,
        timesCompleted: habit.timesCompleted + 1,
      })
      .then(getAllHabits);
  };

  const deleteHabit = () => {
    axios.delete(`/api/${habit.id}/habits`).then(getAllHabits);
  };

  const showGoal = () => {
    if (habit.timesCompleted >= habit.goal) {
      return (
        <Typography variant='body1' sx={{ color: green[400], stroke: '2px' }}>
          <b>You're done for the day! Good job! 🥳 </b>
        </Typography>
      );
    }
    // return (
    // <Typography variant="body1">
    //   You have completed this habit {habit.timesCompleted} times!
    // </Typography>
    // );
  };

  const showStreak = () => {
    if (habit.streak) {
      return (
        <Typography variant='body1'>
          You have a streak of {habit.streak}!
        </Typography>
      );
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '1rem',
        padding: '1rem',
        backgroundColor:
          habit.goal <= habit.timesCompleted ? orangeColor : '#f9f9f9',
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' component='div'>
              {habit.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='text.secondary'>
              Your daily goal is <b>{habit.goal} </b><br /> You have completed this
              habit<b> {habit.timesCompleted} </b>times
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {showGoal()}
          </Grid>
          <Grid item xs={12}>
            {showStreak()}
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Fab
                size='small'
                sx={{ backgroundColor: green[400] }}
                aria-label='add'
                onClick={updateHabit}
              >
                <AddIcon />
              </Fab>
              <Fab
                size='small'
                sx={styleRedButton}
                color='secondary'
                aria-label='delete'
                onClick={deleteHabit}
              >
                <DeleteIcon />
              </Fab>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
