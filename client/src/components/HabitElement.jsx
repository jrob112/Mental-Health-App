import axios from 'axios';
import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ({ habit, getAllHabits }) {
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
  return (
    <>
      <h3> {habit.description} </h3>
      <p> Your Daily Goal is {habit.goal}</p>
      {(() => {
        if (habit.timesCompleted >= habit.goal) {
          return <p> Your Done for the day! Good Job! 🥳</p>;
        }
        return (
          <p> You have completed this habit {habit.timesCompleted} times!!</p>
        );
      })()}
      {() => {
        if (habit.streak) {
          return <p> You have a Streak of {habit.streak}! </p>;
        }
      }}
      <Fab
        size='small'
        color='secondary'
        aria-label='add'
        onClick={updateHabit}
      >
        <AddIcon sx={{ mr: 1 }} />
      </Fab>
      {/* <button onClick={updateHabit}> Task Completed again</button> */}
      <Fab
        size='small'
        color='secondary'
        aria-label='add'
        onClick={updateHabit}
      >
        <DeleteIcon />
      </Fab>
      {/* <button onClick={deleteHabit}> I'm Tired of this Habit! </button> */}
    </>
  );
}
