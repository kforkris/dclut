import React, { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { Chart } from "chart.js/auto";

const Index = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log("data in line graph...", data);

  // ✅ Static fallback data
  const staticLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  // []
  const staticCurrentSales = [105, 95, 160, 125.49];
  // []

  const staticLastSales = [75, 85, 100, 119.69];
  // []

  const hasData =
    data &&
    Array.isArray(data) &&
    data[1]?.rows?.length > 0 &&
    data[0]?.rows?.length > 0;

  const currentMonthData = hasData ? data[1].rows : [];
  const lastMonthData = hasData ? data[0].rows : [];

  // Extract from dynamic data
  const currentMonthLabels = hasData
    ? currentMonthData.map((item) =>
        new Date(item["blinkit_insights_sku.created_at"]).toLocaleDateString(
          "en-IN",
          { day: "numeric", month: "short" }
        )
      )
    : staticLabels;

  const currentMonthSales = hasData
    ? currentMonthData.map((item) => item["blinkit_insights_sku.sales_mrp_sum"])
    : staticCurrentSales;

  const lastMonthSales = hasData
    ? lastMonthData.map((item) => item["blinkit_insights_sku.sales_mrp_sum"])
    : staticLastSales;

  const totalCurrent = currentMonthSales.reduce((a, b) => a + b, 0).toFixed(2);
  const totalLast = lastMonthSales.reduce((a, b) => a + b, 0).toFixed(2);
  const growthPercent = (
    ((totalCurrent - totalLast) / totalLast) *
    100
  ).toFixed(1);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: currentMonthLabels,
          datasets: [
            {
              label: "This Month",
              data: currentMonthSales,
              borderColor: "#10B981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              borderWidth: 2,
            },
            {
              label: "Last Month",
              data: lastMonthSales,
              borderColor: "#EF4444",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              tension: 0.4,
              borderWidth: 2,
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function (value) {
                  return "₹" + value;
                },
              },
            },
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
        <h4>Sales (MRP)</h4>
        <CiCircleQuestion />
      </div>
      <hr />
      <div className={styles.countHeader}>
        <h2>₹{totalCurrent}</h2>
        <div>
          <h5 style={{ color: growthPercent > 0 ? "#10B981" : "#EF4444" }}>
            <IoIosArrowRoundUp />
            {Math.abs(growthPercent) || 0}%
          </h5>
          <h6>vs ₹{totalLast} last month</h6>
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
            <div
              className={styles.bullet}
              style={{ background: "#E25D33" }}
            ></div>
            <h5>Last Month</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
