import React, { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { Chart } from "chart.js/auto";

const Index = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log("data in pie chart...", data);

  // ✅ Dummy Data Fallback (For Demo)
  const staticCities =
    [
      { name: "New Delhi", sales: 26.5, percent: 35, change: 1.2 },
      { name: "Mumbai", sales: 20.1, percent: 28, change: 0.9 },
      { name: "Bangalore", sales: 15.3, percent: 20, change: 0.7 },
      { name: "Chennai", sales: 10.1, percent: 17, change: 0.5 },
    ] || [];

  const useStatic =
    !data || !Array.isArray(data) || data[0]?.rows?.length === 0;

  const cities = useStatic
    ? staticCities
    : data[0].rows.map((row) => ({
        name: row["blinkit_insights_city.name"],
        sales: parseFloat(
          row["blinkit_insights_city.sales_mrp_sum"] / 100000
        ).toFixed(2), // Lakh ₹
        percent: Math.floor(Math.random() * 30) + 10, // optional random percent
        change: (Math.random() * 3).toFixed(1), // optional random change
      }));

  const chartData = cities.map((city) => parseFloat(city.sales));
  const chartLabels = cities.map((city) => city.name);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
              borderColor: ["#fff", "#fff", "#fff", "#fff"],
              borderWidth: 0.5,
              circumference: 180,
              rotation: -90,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ₹${context.raw}L`,
              },
            },
          },
          animation: {
            animateScale: false,
            animateRotate: false,
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h4>Top Cities</h4>
        <CiCircleQuestion />
      </div>
      <hr />
      <div className={styles.doghnutCharts}>
        <div className={styles.halfDoughnutContainer}>
          <canvas ref={chartRef} />
        </div>
        <div className={styles.counts}>
          <h4>Total</h4>
          <h5>
            ₹{cities.reduce((a, b) => a + parseFloat(b.sales), 0).toFixed(1)}L
          </h5>
          <h6>
            <IoIosArrowRoundUp /> 2.2
          </h6>
        </div>

        {cities.map((city, index) => (
          <div className={styles.cityLabels} key={index}>
            <div className={styles.label}>
              <div className={styles.city}>
                <div
                  style={{
                    backgroundColor: [
                      "#10B981",
                      "#3B82F6",
                      "#F59E0B",
                      "#EF4444",
                    ][index],
                  }}
                ></div>
                <h4>{city.name}</h4>
              </div>
              <div className={styles.stats}>
                <h3>₹{city.sales}L</h3>
                <h4>{city.percent}%</h4>
                <h5>
                  <IoIosArrowRoundUp /> {city.change}%
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
