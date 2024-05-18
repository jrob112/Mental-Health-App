import axios from 'axios';
import React, { useState } from 'react';

const userId = 5;

export default function HabitForm({ getAllHabits }) {
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState(1);

  const submitNewHabit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    return axios
      .post(`/api/${userId}/habits`, {
        goal,
        description,
      })
      .then(getAllHabits);
  };

  return (
    <form>
      <input
        type='text'
        name='description'
        value={description}
        placeholder='description'
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='number'
        name='goal'
        placeholder='goal'
        value={goal}
        min='1'
        onChange={(e) => setGoal(Number(e.target.value))}
      />
      <button onClick={submitNewHabit}> Submit New Habit </button>
    </form>
  );
}
