import React, { useState } from "react";

const Journal = () => {

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
      >Save Journal</button>
    </>
  )
}

export default Journal;
