import React from "react";
import { Box } from "@mui/material";
import JournalBarItem from "./JournalBarItem.jsx";
import Carousel from 'react-material-ui-carousel'

const JournalBar = ({ journals, deleteJournal }) => {
  return (
    <Box
      sx={{maxWidth: 600}}
    >
      <Carousel>
        {journals.map(journal => <JournalBarItem journal={journal} deleteJournal={deleteJournal} key={journal.id} />)}
      </Carousel>
    </Box>
  )
}

export default JournalBar;
