import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { styleRedButton } from './styles';


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
    <Container>
      <Typography variant='h4' component='h1' gutterBottom>
        Add New Habit
      </Typography>
      <Box
        component='form'
        onSubmit={submitNewHabit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-end' }}
        >
          <TextField
            label='Habit Description'
            value={description}
            id="filled-multiline-flexible"
            variant="filled"
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            sx={{ flex: 2 }} // Adjust the flex ratio to give more space to description
          />
          <TextField
            label='Daily Goal'
            type='number'
            id="filled-multiline-flexible"
            variant="filled"
            value={goal}
            placeholder='Goal'
            inputProps={{ min: '1' }}
            onChange={(e) => setGoal(Number(e.target.value))}
            required
            sx={{ flex: 1 }} // Smaller flex ratio as less space is needed for goal
          />
        </Box>
        <Button type='submit' variant='contained' sx={styleRedButton} fullWidth>
          Submit New Habit
        </Button>
      </Box>
    </Container>
  );
}
