import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, ButtonGroup, Box, Divider } from "@mui/material";
import { typographyFontVougella, pageBackground, styleRedButton, styleOrangeBox } from "./styles.js";
import axios from "axios";
import dayjs from "dayjs";


const JournalEntry = () => {
  const [journal, setJournal] = useState({})
  const [body, setBody] = useState(journal.body);
  const [title, setTitle] = useState(journal.title)
  const [editMode, toggleEditMode] = useState(false)
  const journalRef = useRef(journal);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/journal/${id}`)
      .then(({data}) => {
        setJournal(data);
      })
      .catch((err) => {
        console.error('Could not get journal entry: ', err)
      })
  }, [journalRef])

  const cancelEdit = () => {
    setBody(journal.body)
    setTitle(journal.title)
    toggleEditMode(!editMode);
  }

  const submitEdit = () => {
    axios.put(`/api/journal/${journal.id}`, {updatedJournal: {title, body}})
      .then(({data}) => {
        if (data === 'OK') {
          setJournal({...journal, title, body})
        }
        else {
          console.error('Could not update journal')
          cancelEdit()
        }
      })
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