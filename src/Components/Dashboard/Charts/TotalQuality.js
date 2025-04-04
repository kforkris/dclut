import React, { useRef, useEffect } from 'react';
import styles from "./styles.module.scss";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { Chart } from 'chart.js/auto'; // Simplified import

const index = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Current Month',
              data: [85, 95, 110, 125.49],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              borderWidth: 2,
            },
            {
              label: 'Last Month',
              data: [75, 85, 100, 119.69],
              borderColor: '#EF4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              borderWidth: 2,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              display:false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  return '₹' + value;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h4>Total Quantity Sold</h4>
        <CiCircleQuestion />
      </div>
      <hr />
      <div className={styles.countHeader}>
        <h2>₹125.49</h2>
        <div>
          <h5>
            <IoIosArrowRoundUp /> 
            2.4%
          </h5>
          <h6>vs ₹119.69 last month</h6>
        </div>
      </div>
      <div className={styles.salesChart}>
          <div className={styles.chartContainer}>
            <canvas ref={chartRef} />
          </div>
          <div className={styles.monthCharts}>
            <div>
              <div className={styles.bullet}></div>
              <h5>This Month</h5>
            </div>
            <div>
              <div className={styles.bullet} style={{background:"#E25D33"}}></div>
              <h5>Last Month</h5>
            </div>
          </div>
        </div>
    </div>
  );
};

export default index; // Make sure this is a default export