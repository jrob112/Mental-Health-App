import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, ButtonGroup, Box, Divider } from "@mui/material";
import { typographyFontVougella, pageBackground, styleRedButton, styleOrangeBox } from "./styles.js";
import axios from "axios";
import dayjs from "dayjs";

const JournalEntry = () => {

  // STATE
  // journal entry object
  const [journal, setJournal] = useState({})
  // editable body text
  const [body, setBody] = useState(journal.body);
  // editable title text
  const [title, setTitle] = useState(journal.title)
  // flag to denote edit mode
  const [editMode, toggleEditMode] = useState(false)
  const journalRef = useRef(journal);

  // journal id from react router endpoint
  const { id } = useParams();

  // On load, fetch journal entry
  useEffect(() => {
    // GET /api/journal/:id
    axios.get(`/api/journal/${id}`)
      .then(({data}) => {
        // save data to journal state
        setJournal(data);
      })
      //notify if error occurs
      .catch((err) => {
        console.error('Could not get journal entry: ', err)
      })
  }, [journalRef])

  // if cancel is pressed reset state
  const cancelEdit = () => {
    // set body and title to original value
    setBody(journal.body);
    setTitle(journal.title);

    // change edit mode to false
    toggleEditMode(!editMode);
  }

  // submit changes when submit is pressed
  const submitEdit = () => {
    // PUT /api/journal/id
    axios.put(`/api/journal/${journal.id}`, {updatedJournal: {title, body}})
      // if successfuly posted, save edited version to journal state
      .then(({data}) => {
        if (data === 'OK') {
          setJournal({...journal, title, body})
        }
        // otherwise notify and cancel edit
        else {
          console.error('Could not update journal')
          cancelEdit()
        }
      })
      // notify if error occurs
      .catch((err) => {
        console.error('Could not update journal: ', err);
      })
  }

  
  return (
    <Box sx={pageBackground}>
      {
        editMode ?
        <TextField
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          id="filled-multiline-flexible"
          label="Title"
          variant="filled"
        /> :
        <Typography variant="h1" sx={typographyFontVougella}>{journal.title}</Typography>
      }
      {
        editMode ?
        <ButtonGroup>
          <Button variant="contained" color="success" onClick={submitEdit}>Submit</Button>
          <Button variant="contained" color="error" onClick={cancelEdit}>Cancel</Button>
        </ButtonGroup> :
        <Button variant="contained" onClick={cancelEdit} sx={styleRedButton}>Edit</Button>}
      <Typography variant="h3" sx={typographyFontVougella}>{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
      <Divider />
      {
        editMode ?
        <TextField
          onChange={(e) => {setBody(e.target.value)}}
          value={body}
          id="standard-multiline-static"
          label="Whats on your mind?"
          multiline
          rows={6}
          variant="filled"
        /> :
        <Box
        sx={{
          display: "flex",
          flexDirection: 'column'
        }}
        >
        { journal.body === undefined ?
          <div></div> :
          journal.body.split('\n').map(paragraph => <Typography variant="p" gutterBottom sx={typographyFontVougella}>{paragraph}</Typography>)
        }
        </Box>
      }
    </Box>
  )
}

export default JournalEntry;