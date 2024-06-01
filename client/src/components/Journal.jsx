import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { Typography, Button, TextField, Box } from "@mui/material";
import JournalBar from "./JournalBar.jsx";

const Journal = () => {

  const getJournals = () => {
    axios.get(`/api/journal`)
    .then(({ data }) => { setJournals(data);})
    .catch((err) => console.error('Could not get journal entries: ', err));
  }

  const deleteJournal = (id) => {
    axios.delete(`/api/journal/${id}`)
      .then(() => { getJournals(); })
  }

  const onSubmit = () => {
    axios.post(`/api/journal`, {journal: {title, body}})
      .then(() => { getJournals(); })
      .catch((err) => console.error('Could not post journal: ', err))
  };

  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const journalsRef = useRef(journals)

  useEffect(getJournals, [journalsRef])

  return (
    <>
      <JournalBar journals={journals} deleteJournal={deleteJournal}/>
      <Typography variant="h2" gutterBottom>
        Journal
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          }}
      >
        <TextField
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          id="filled-multiline-flexible"
          label="Title"
          variant="filled"
          />
        <TextField
          onChange={(e) => {setBody(e.target.value)}}
          value={body}
          id="standard-multiline-static"
          label="Whats on your mind?"
          multiline
          rows={6}
          variant="filled"
          />
        <Button
        variant="contained"
          onClick={onSubmit}
        >Save Journal</Button>
      </Box>
    </>
  )
}

export default Journal;
