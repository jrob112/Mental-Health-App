import React from "react";
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

const MoodsChart = ({dataArr}) => {
  const ctx = document.getElementById('myChart');
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['Happy', 'Hopeful', 'Content', 'Worried', 'Sad'];
  
  const data = {
    labels,
    datasets: [{
      label: '# of Votes',
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