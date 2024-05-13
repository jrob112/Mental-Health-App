import React, { useState } from "react";
import axios from 'axios';

const Journal = () => {
  
  const onSubmit = () => {
    axios.post('/api/13/journal', {journal: {title, body}})
      .then(res => console.log(res))
      .catch((err) => console.error('Could not post journal: ', err))
  };
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <>
      <h1>JOURNAL</h1>
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => {setTitle(e.target.value)}}
        placeholder="Title"
      ></input>
      <textarea
        type="text"
        value={body}
        name="body"
        onChange={(e) => {setBody(e.target.value)}}
        placeholder="What's on your mind?"
      ></textarea>
      <button
        type="submit"
        onClick={onSubmit}
      >Save Journal</button>
    </>
  )
}

export default Journal;
