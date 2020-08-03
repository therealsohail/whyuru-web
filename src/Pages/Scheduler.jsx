import React, { useState } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";

import schedulerPic from "../Assets/scheduler.jpg";
import { Banner } from "../Components/Banner";
import Sidebar from "../Components/Sidebar";

const Scheduler = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const openHandler = () => {
  //   if (!sidebarOpen) {
  //     setSidebarOpen(true);
  //   } else {
  //     setSidebarOpen(false);
  //   }
  // };

  const sidebarCloseHandler = () => {
    setSidebarOpen(false);
  };

  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();

  let monthNumber = d.getMonth();
  let year = d.getFullYear();

  let sidebar;

  if (sidebarOpen) {
    sidebar = <Sidebar close={sidebarCloseHandler} sidebar="sidebar" />;
  }

  return (
    <>
      {sidebar}

      <Banner pic={schedulerPic} heading="Scheduler" />
      <h1
        style={{ paddingTop: 30, paddingLeft: 50 }}
      >{`${monthsName[monthNumber]} ${year}`}</h1>
      <Button
        className="add-button"
        bsStyle="primary"
        onClick={() => setSidebarOpen(true)}
      >
        Add Videos
      </Button>

      <hr />
      <div className="container horizontal-scrollable">
        <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4">
          <div className="col-sm-4">
            <h4>Monday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Tuesday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Wednesday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Thursday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Friday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Saturday</h4>
          </div>
          <div className="col-sm-4">
            <h4>Sunday</h4>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Scheduler;
