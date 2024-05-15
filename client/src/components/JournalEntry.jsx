import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";


const userId = 2

const JournalEntry = () => {
  const [journal, setJournal] = useState({})
  const [title, setTitle] = useState(journal.title)
  const [editMode, toggleEditMode] = useState(false)
  const journalRef = useRef(journal);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/${userId}/journal/${id}`)
      .then(({data}) => {
        setJournal(data);
        console.log(journal)
      })
  }, [journalRef])

  const cancelEdit = () => {
    setTitle(journal.title)
    toggleEditMode(!editMode);
  }

  const submitEdit = () => {
    axios.put(`/api/${userId}/journal/${journal.id}`, {updatedJournal: {title, body:journal.body}})
      .then(({data}) => {
        if (data === 'OK') {
          setJournal({...journal, title})
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
    <>
      {
        editMode ?
        <TextField
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          id="filled-multiline-flexible"
          label="Title"
          variant="filled"
        /> :
        <Typography variant="h1">{journal.title}</Typography>
      }
      {
        editMode ?
        <ButtonGroup>
          <Button variant="contained" color="success" onClick={submitEdit}>Submit</Button>
          <Button variant="contained" color="error" onClick={cancelEdit}>Cancel</Button>
        </ButtonGroup> :
        <Button variant="contained" onClick={cancelEdit}>Edit</Button>}
      <Typography variant="h3">{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
      <Typography variant="p">{journal.body}</Typography>
    </>
  )
}

export default JournalEntry;