import axios from 'axios';
import React, { useEffect, useState } from 'react';


const userId = 13;

export default function() {
  const [habits, setHabits] = useState([]);
  const [newHabit, postNewHabit] = useState('');

  useEffect(() =>{
    axios.get(`/api/${userId}/habits`)
      .then((response) => {
        setHabits(response.data);
      });
  });

  // console.log(habits);
  return(
    <>
      <h1> Habits </h1>
      {/* <h3> { habits[0].description} </h3>
        <p> { habits[0].goal }</p>
        <p> You have a Streak of { habits[0].streak}! </p> */}
    </>
  );
};

