import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";

const JournalBarItem = ({ journal }) => {
  return (
    <Card
    variant="outlined"
    sx={{width: 1/4, maxHeight: 250}}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>{journal.title}</Typography>
        <Typography variant="h6" gutterBottom>{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
        <Typography variant="p" gutterBottom>{journal.body.split('\n')[0]}</Typography>
      </CardContent>
    </Card>
  )
}

export default JournalBarItem;
