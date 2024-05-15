import React, { useState, useEffect } from "react";
import axios from 'axios';
import JournalBar from "./JournalBar.jsx";

const userId = 13

const Journal = () => {

  const onSubmit = () => {
    axios.post(`/api/${userId}/journal`, {journal: {title, body}})
      .then(res => console.log(res))
      .catch((err) => console.error('Could not post journal: ', err))
  };

  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    axios.get(`/api/${userId}/journal`)
      .then(({ data }) => { setJournals(data); })
      .catch((err) => console.error('Could not get journal entries: ', err));
  })

  return (
    <>
      <JournalBar journals={journals}/>
      <Typography variant="h2" gutterBottom>
        Journal
      </Typography>
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
    </>
  )
}

export default Journal;
