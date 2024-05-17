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

const MoodsChart = () => {
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
      data: [12, 19, 3, 5, 2],
      borderWidth: 1
    }]
  };

  
  return (
    <Bar options={options} data={data} />
    // <Chart  
    //       type='bar'
    //       data={
    //         {
    //           labels: ['Happy', 'Hopeful', 'Content', 'Worried', 'Sad'],
    //           datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2],
    //             borderWidth: 1
    //           }]
    //         }
    //       }
          // options={
          //   {
          //     scales: {
          //     y: {
          //       beginAtZero: true
          //     }
          //   }
          // }}
    // />
  )
}

export default MoodsChart;