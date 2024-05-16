import React from "react";
import MoodsChart from "./MoodsChart.jsx";

const moodsArr = [
  "Happy",
  "Hopeful",
  "Content",
  "Worried",
  "Sad"
]


const Moods = () => {
  return (
    <div>
      <ul>
        { moodsArr.map((mood, i) => <li key={i}>{mood}</li>)}
      </ul>
      <MoodsChart />
    </div>
  )
};

export default Moods;
