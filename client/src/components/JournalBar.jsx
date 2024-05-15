import React from "react";
import JournalBarItem from "./JournalBarItem.jsx";

const JournalBar = ({ journals, deleteJournal }) => {
  return (
    <>
      {journals.map(journal => <JournalBarItem journal={journal} deleteJournal={deleteJournal} key={journal.id} />)}
    </>
  )
}

export default JournalBar;
