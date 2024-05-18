import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import HabitElement from './HabitElement.jsx';
import HabitForm from './HabitForm.jsx';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styleOrangeBox } from './styles.js';
import backgroundImage from './floweraura.jpeg';

const userId = 4;

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const habitsRef = useRef(habits);

  const getAllHabits = () => {
    axios
      .get(`/api/${userId}/habits`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((err) => console.error('Could not get journal entries: ', err));
  };

  useEffect(() => {
    getAllHabits();
  }, [habitsRef]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Container>
          <Box sx={{
            ...styleOrangeBox,
            width: '100%',
          }}>
            <Typography
              variant='h1'
              sx={{
                fontFamily: 'Voguella, sans-serif',
              }}
            >
              Habits
            </Typography>
            <Typography
              variant='h4'
              sx={{
                fontFamily: 'Voguella, sans-serif',
              }}
            >
              To keep track of your habits, press the plus button every time you
              complete a habit for the day!
              <br />
              If you don't need a habit anymore, press the trash can to delete
              it.
            </Typography>
          </Box>
          <HabitForm getAllHabits={getAllHabits} />
          <Grid container spacing={3}>
            {habits.map((habit) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={`${habit.description}-${habit.id}`}
              >
                <HabitElement getAllHabits={getAllHabits} habit={habit} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
