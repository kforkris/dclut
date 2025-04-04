import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Panel from "./Panel";
const index = () => {
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);

  const toggleRightPanel = () => {
    setIsRightPanelVisible(!isRightPanelVisible);
  };

  return (
    <div>
      <Sidebar
        toggleRightPanel={toggleRightPanel}
        isRightPanelVisible={isRightPanelVisible}
        setIsRightPanelVisible={setIsRightPanelVisible}
      />
      <Panel
        toggleRightPanel={toggleRightPanel}
        isRightPanelVisible={isRightPanelVisible}
        setIsRightPanelVisible={setIsRightPanelVisible}
      />
    </div>
  );
};

export default index;
