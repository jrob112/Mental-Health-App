import React, { useState } from "react";
import MoodsChart from "./MoodsChart.jsx";


const Moods = () => {
  
  const moodsArr = [
    "Happy",
    "Hopeful",
    "Content",
    "Worried",
    "Sad"
  ]
  const [dataArr, setDataArr] = useState([12, 19, 3, 5, 2]);
  const updateMood = (e) => {
    setDataArr((previousDataArr) => previousDataArr[moodsArr.indexOf(e.target.innerText)]++)
    console.log(dataArr);
  }
  return (
    <div>
      <ul>
        { moodsArr.map((mood, i) => <li key={i} ><button onClick={updateMood} >{mood} </button></li>)}
      </ul>
      <MoodsChart dataArr={dataArr}/>
    </div>
  )
};

export default Moods;
