import React from "react";
import { useState } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import Time from "./Time";

const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const closeHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 1000);
  };
  return (
    <div className={sidebarClass}>
      <button id="close" onClick={closeHandler}>
        <i class="fas fa-times" style={{ color: "#000" }}></i>
      </button>

      <Time />
    </div>
  );
};

export default Sidebar;
