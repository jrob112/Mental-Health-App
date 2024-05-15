import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";


const userId = 2

const JournalEntry = () => {
  const [journal, setJournal] = useState({})
  const journalRef = useRef(journal);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/${userId}/journal/${id}`)
      .then(({data}) => {
        setJournal(data);
        console.log(journal)
      })
  }, [journalRef])

  return (
    <>
      <Typography variant="h1">{journal.title}</Typography>
      <Typography variant="h3">{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
      <Typography variant="p">{journal.body}</Typography>
    </>
  )
}

export default JournalEntry;