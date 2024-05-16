import React from "react";
import JournalBarItem from "./JournalBarItem.jsx";
import Carousel from 'react-material-ui-carousel'

const JournalBar = ({ journals, deleteJournal }) => {
  return (
    <Carousel
    >
      {journals.map(journal => <JournalBarItem journal={journal} deleteJournal={deleteJournal} key={journal.id} />)}
    </Carousel>
  )
}

export default JournalBar;
