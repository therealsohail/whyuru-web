import React from "react";
import { useState } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import Time from "./Time";

const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar);
  //   const [m, setM] = useState(moment());

  //   const handleChange = (m) => {
  //     setM(m);
  //   };

  //   const handleSave = () => {
  //     console.log(m, m.format("1111"));
  //   };

  const closeHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 1000);
  };
  return (
    <div className={sidebarClass}>
      <h2>Sidebar</h2>
      <button id="close" onClick={closeHandler}>
        <i class="fas fa-times"></i>
      </button>
      <center>
        <Time />
        {/* <form>
          <div className="input">
            <input type="text" value={m.format("1111")} readOnly />
          </div>
          <InputMoment moment={m} onChange={handleChange} onSave={handleSave} />
        </form> */}
      </center>
    </div>
  );
};

export default Sidebar;
