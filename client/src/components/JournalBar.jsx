import React from "react";
import { Box } from "@mui/material";
import JournalBarItem from "./JournalBarItem.jsx";

const JournalBar = ({ journals }) => {
  return (
    <Box>
      {journals.map(journal => <JournalBarItem journal={journal} key={journal.id} />)}
    </Box>
  )
}

export default JournalBar;
