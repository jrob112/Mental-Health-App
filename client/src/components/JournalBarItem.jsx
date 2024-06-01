import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import { typographyFontVougella, pageBackground, styleRedButton, styleOrangeBox } from "./styles.js";


const JournalBarItem = ({ journal, deleteJournal }) => {

  // when delete is pressed call parent deletJournal function
  const handleDelete = () => {
    deleteJournal(journal.id);
  }

  return (
    <Card
    variant="outlined"
    sx={{width: 1/4, minWidth: 550, marginTop: 2}}
    >
      <CardContent>
        <Typography variant="h4" sx={typographyFontVougella} gutterBottom>{journal.title}</Typography>
        <Typography variant="h6" sx={typographyFontVougella} gutterBottom>{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
        <Box
        sx={{maxHeight: 80, overflow: 'hidden'}}
        >
          <Typography variant="p" sx={typographyFontVougella} gutterBottom>{journal.body.split('\n')[0]}</Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link to={`/journal/${journal.id}`}><Button sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="text">Read Entry</Button></Link>
        <Button onClick={handleDelete}sx={{ ...styleRedButton, color: 'white', width: 125 }}><DeleteForeverIcon /></Button>
      </CardActions>
    </Card>
  )
}

export default JournalBarItem;
