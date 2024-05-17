import axios from 'axios';
import React from 'react';

export default function ({ habit }) {
  const updateHabit = () => {
    axios.patch(`/api/${habit.id}/habits`, {
      goal: habit.goal,
      timesCompleted: habit.timesCompleted + 1,
    });
  };

  const deleteHabit = () => {
    axios.delete(`/api/${habit.id}/habits`)
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
      <button onClick={updateHabit}> Task Completed again</button>
      <button onClick={deleteHabit}> I'm Tired of this Habit! </button>
    </>
  );
}
