import React from "react";

const moodsArr = [
  {1: "Sad"},
  {2: "Sad"},
  {3: "Sad"},
  {4: "Sad"},
  {5: "Sad"},
  {6: "Sad"},
  {7: "Sad"},
  {8: "Sad"},
  {9: "Sad"},
  {10: "Happy"}
]


const Moods = () => {
  return (
    <div>
      <ul>
        { moodsArr.map(mood => <li>{mood}</li>)}
      </ul>
    </div>
  )
};

export default Moods;
