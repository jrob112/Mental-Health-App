import React from 'react';

export default function ({ habit }) {
  console.log(habit.goal, habit.description, habit.streak);
  return (
    <>
      <h3> {habit.description} </h3>
      <p> Your Daily Goal is { habit.goal }</p>
      <p> You have a Streak of {habit.streak}! </p>
    </>
  );
}
