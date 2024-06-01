import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoodsChart = ({dataArr}, chart) => {
  // references the chart 
  const ctx = document.getElementById('myChart');
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Healthier Moods Chart',
      },
    },
  };
  // chart labels
  const labels = ['Happy', 'Hopeful', 'Content', 'Worried', 'Sad'];
  
  const data = {
    labels,
    datasets: [{
      label: '# of Moods',
      data: dataArr,
      borderWidth: 1,
      borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5',
    }]
  };

  return (
    <Bar options={options} data={data} />
   
  )
}

export default MoodsChart;