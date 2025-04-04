import React, { act, useEffect, useState } from "react";
import styles from "./styles.module.scss";
const chartLine = "/images/ChartLine.svg";
import Switch from "react-switch";
const blinkit = "/images/blinkit.svg";
const zepto = "/images/zepto.svg";
const instamart = "/images/instamart.svg";
import Charts from "../Charts";
import SkuTable from "../SkuTable";
const index = ({ toggleRightPanel, isRightPanelVisible }) => {
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("Blinkit");
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("./api/getDashboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  console.log("data from backend...........", data);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const chartData = (data?.cards || []).filter((item) =>
    item?.visualizationType?.includes("chart")
  );
  const tableData = (data?.cards || []).filter((item) =>
    item?.visualizationType?.includes("table")
  );
  return (
    <div
      className={styles.panelContainer}
      style={!isRightPanelVisible ? { marginLeft: "100px" } : {}}
    >
      <div className={styles.header}>
        <h4>Quick Commerce</h4>
        <div>
          <div className={styles.switch}>
            <img src={chartLine} alt="chart-line" />
            <Switch
              onChange={handleChange}
              checked={checked}
              onColor="#027056"
              onHandleColor="#FFF"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={14}
              width={32}
              className="react-switch"
            />
          </div>
          <input type="date" />
        </div>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <div
            style={activeTab === "Blinkit" ? { background: "#DFEAE8" } : {}}
            onClick={() => setActiveTab("Blinkit")}
          >
            <img src={blinkit} />
            <h5 style={activeTab === "Blinkit" ? { color: "#027056" } : {}}>
              Blinkit
            </h5>
          </div>
          <div
            style={activeTab === "Zepto" ? { background: "#DFEAE8" } : {}}
            onClick={() => setActiveTab("Zepto")}
          >
            <img src={zepto} />
            <h5 style={activeTab === "Zepto" ? { color: "#027056" } : {}}>
              Zepto
            </h5>
          </div>
          <div
            style={activeTab === "Instamart" ? { background: "#DFEAE8" } : {}}
            onClick={() => setActiveTab("Instamart")}
          >
            <img src={instamart} />
            <h5 style={activeTab === "Instamart" ? { color: "#027056" } : {}}>
              Instamart
            </h5>
          </div>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <Charts chartData={chartData} />
        {(tableData || []).map((item, index) => {
          return <SkuTable tableData={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default index;
