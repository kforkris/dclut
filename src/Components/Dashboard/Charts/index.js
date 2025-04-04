import React from "react";
import styles from "./styles.module.scss";
import SalesChart from "./SalesChart";
import TotalQuality from "./TotalQuality";
import TopCities from "./TopCities";
const index = ({ chartData }) => {
  return (
    <div className={styles.chartContainer}>
      {(chartData || []).map((item, index) =>
        item?.visualizationType == "linechart" ? (
          <SalesChart data={item} key={index} />
        ) : (
          <TopCities data={item} key={index} />
        )
      )}

      {/* <TotalQuality /> */}
    </div>
  );
};

export default index;
