import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import dayjs from "dayjs";

const JournalBarItem = ({ journal }) => {
  return (
    <Card
    variant="outlined"
    sx={{width: 1/4, maxHeight: 250, minWidth: 550}}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>{journal.title}</Typography>
        <Typography variant="h6" gutterBottom>{dayjs(journal.createdAt).format('MMM-D-YYYY')}</Typography>
        <Box
        sx={{maxHeight: 75, overflow: 'hidden'}}
        >
          <Typography variant="p" gutterBottom>{journal.body.split('\n')[0]}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Read Entry</Button>
      </CardActions>
    </Card>
  )
}

export default JournalBarItem;
