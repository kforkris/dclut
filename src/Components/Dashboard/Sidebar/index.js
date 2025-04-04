import React from "react";
import styles from "./styles.module.scss";
const perfora = "/images/perfora.svg";
const mamaearth = "/images/mamaearth.svg";
const logo = "/images/logo.svg";
const add = "/images/Add.svg";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineHome,
  MdOutlineTv,
} from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { LuUsers } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Sidebar = ({ toggleRightPanel, isRightPanelVisible }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.leftSidebar}>
        <img src={perfora} alt="perfora" />
        <div className={styles.sidepanel}>
          <div>
            <img src={mamaearth} alt="mamaearth" />
          </div>
          <div>
            <img src={logo} alt="mamaearth" />
          </div>
          <div>
            <img src={add} alt="mamaearth" />
          </div>
        </div>
        <div className={styles.stickyPanel}>
          <div>
            <LuUsers />
          </div>
          <div className={styles.initials}>
            <h4>SS</h4>
          </div>
        </div>
      </div>
      {isRightPanelVisible ? (
        <div className={styles.rightPanelSidebar}>
          <div className={styles.sidebarTop}>
            <div className={styles.details}>
              <div>
                <div className={styles.initials}>
                  <h4>SS</h4>
                </div>
                <h5>Test_brand</h5>
              </div>
              <div className={styles.arrow}>
                <MdOutlineKeyboardArrowUp />
                <MdOutlineKeyboardArrowDown />
              </div>
            </div>
            <MdOutlineKeyboardDoubleArrowLeft
              className={styles.leftArrow}
              onClick={toggleRightPanel}
            />
          </div>
          <div className={styles.sidenav}>
            <div className={styles.fixPanel}>
              <div>
                <MdOutlineHome style={{ width: "22px", height: "22px" }} />
                <h4>Overview</h4>
              </div>
              <div>
                <MdOutlineTv />
                <h4>Channels</h4>
              </div>
              <div className={styles.activeLinks}>
                <h4>Meta Ads</h4>
                <h4>Google Ads</h4>
                <div className={styles.activeTab}>
                  <h4>Quick Commerce</h4>
                </div>
              </div>
              <div>
                <GrGallery />
                <h4>Creatives</h4>
              </div>
            </div>
            <div className={styles.stickyPanel}>
              <div>
                <IoMdHelpCircleOutline />
                <h5>Help</h5>
              </div>
              <div>
                <CiSettings />
                <h5>Settings</h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          <MdOutlineKeyboardDoubleArrowLeft
            className={styles.leftArrow}
            onClick={toggleRightPanel}
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
