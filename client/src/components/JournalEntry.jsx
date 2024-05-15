import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";



const JournalEntry = () => {
  const userId = 2
  const [journal, setJournal] = useState({})
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/${userId}/journal/${id}`)
      .then(({data}) => {
        setJournal(data)
      })
  })

  return (
    <>
      <Typography variant="h1">{journal.title}</Typography>
      <Typography variant="h3">{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
      <Typography variant="p">{journal.body}</Typography>
    </>
  )
}

export default JournalEntry;