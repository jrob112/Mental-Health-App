import React from "react";

const JournalBarItem = ({ journal }) => {
  return (
    <>
      <h1>{journal.title}</h1>
      <h2>{journal.createdAt}</h2>
      <p>{journal.body.split('\n')[0]}</p>
    </>
  )
}

export default JournalBarItem;
