import React from "react";
import JournalBarItem from "./JournalBarItem.jsx";

const JournalBar = ({ journals }) => {
  return (
    <>
      {journals.map(journal => <JournalBarItem journal={journal} key={journal.id} />)}
    </>
  )
}

export default JournalBar;
