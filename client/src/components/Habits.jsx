import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import HabitElement from './HabitElement.jsx';
import HabitForm from './HabitForm.jsx';

const userId = 4;

export default function () {
  const [habits, setHabits] = useState([]);
  const habitsRef = useRef(habits);

  useEffect(() => {
    axios
      .get(`/api/${userId}/habits`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((err) => console.error('Could not get journal entries: ', err));
  }, [habitsRef]);

  return (
    <>
        <h1> Habits </h1>
        <HabitForm />
      {habits.map((habit) => {
        return <HabitElement habit={habit} key={`${habit.description}-${habit.id}`}/>;
      })}
    </>
  );
}
