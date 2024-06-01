import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { Typography, Button, TextField, Box } from "@mui/material";
import JournalBar from "./JournalBar.jsx";
import BookIcon from '@mui/icons-material/Book';
import { typographyFontVougella, pageBackground, styleRedButton, styleOrangeBox } from "./styles.js";

const Journal = () => {

  // fetch all user journals from server
  const getJournals = () => {
    // GET /api/journals
    axios.get(`/api/journal`)
      // save data in journals state
      .then(({ data }) => { setJournals(data);})
      // notify if error occurs
      .catch((err) => console.error('Could not get journal entries: ', err));
  }

  // request delete given journal from database
  const deleteJournal = (id) => {
    // DELETE /api/journal:id
    axios.delete(`/api/journal/${id}`)
      // fetch updated journal array
      .then(() => { getJournals(); })
      // notify if error occurs
      .catch((err) => console.error('Could not delete journal entry: ', err));

  }

  // request post of new journal entry when submit button is pressed
  const onSubmit = () => {
    // POST /api/journal
    axios.post(`/api/journal`, {journal: {title, body}})
      // fetch updated journal array
      .then(() => { getJournals(); })
      // notify if error occurs
      .catch((err) => console.error('Could not post journal: ', err))
  };

  // STATE
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const journalsRef = useRef(journals)

  // On load, fetch all journals
  useEffect(getJournals, [journalsRef])

  return (
    <Box sx={pageBackground}>
      <Box sx={{...styleOrangeBox, display: 'inline-flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Typography variant="h2" sx={typographyFontVougella}>
          Journal
        </Typography>
        <BookIcon fontSize="large" />
      </Box>
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
          sx={styleRedButton}
          variant="contained"
          onClick={onSubmit}
        >Save Journal</Button>
        <JournalBar journals={journals} deleteJournal={deleteJournal}/>
      </Box>
    </Box>
  )
}

export default Journal;
