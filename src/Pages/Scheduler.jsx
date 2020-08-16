import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";

import schedulerPic from "../Assets/scheduler.jpg";
import { Banner } from "../Components/Banner";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { isEmptyObject } from "jquery";

const Scheduler = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

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
  let dt = new Date();
  let year = dt.getFullYear();
  let month = dt.getMonth() + 1;
  let day = dt.getDate();
  let formattedYear = month.toString().length === 1 ? `0${month}` : month;

  let date = `${year}-${formattedYear}-${day}`;

  let monthNumber = dt.getMonth();
  // let year = d.getFullYear();
  // let day = d.getDate();
  let sun = [];
  let mon = [];
  let tue = [];
  let wed = [];
  let thu = [];
  let fri = [];
  let sat = [];

  useEffect(() => {
    axios
      .post("https://whyuruapi.herokuapp.com/api//WeeklySchedulers", {
        date: date,
      })
      .then((res) => {
        let response = res.data;
        console.log(response);
        response.forEach((obj) => {
          if (obj.day === "Sunday") {
            if (obj) {
              sun.push(obj);
              setSunday([obj]);
            }
          }
          if (obj.day === "Monday") {
            if (obj) {
              mon.push(obj);
              setMonday([obj]);
            }
          }
          if (obj.day === "Tuesday") {
            if (obj) {
              tue.push(obj);
              setTuesday([obj]);
            }
          }
          if (obj.day === "Wednesday") {
            if (obj) {
              wed.push(obj);
              setWednesday([obj]);
            }
          }
          if (obj.day === "Thursday") {
            if (obj) {
              thu.push(obj);
              setThursday([obj]);
            }
          }
          if (obj.day === "Friday") {
            if (obj) {
              fri.push(obj);
              setFriday([obj]);
            }
          }
          if (obj.day === "Saturday") {
            if (obj) {
              sat.push(obj);
              setSaturday([obj]);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let sidebar;

  if (sidebarOpen) {
    sidebar = <Sidebar close={sidebarCloseHandler} sidebar="sidebar" />;
  }

  console.log(monday);

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
            <h4 style={{ textAlign: "center" }}>Monday</h4>
            {/* {monday &&
              monday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Tuesday</h4>
            {/* {tuesday &&
              tuesday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Wednesday</h4>
            {/* {wednesday &&
              wednesday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Thursday</h4>
            {/* {thursday &&
              thursday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Friday</h4>
            {/* {friday &&
              friday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Saturday</h4>
            {/* {saturday &&
              saturday.data.map((item, id) => {
                return (
                  <img
                    style={{ paddingTop: 10, margin: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                    width="200"
                    height="120"
                  />
                );
              })} */}
          </div>
          <div className="col-sm-4">
            <h4 style={{ textAlign: "center" }}>Sunday</h4>

            {/* {sunday &&
              sunday.data.map((item) => {
                console.log(item);
                return (
                  <center>
                    <img
                      style={{ paddingTop: 10, margin: "auto" }}
                      src={item.thumbnail}
                      alt={item.title}
                      width="200"
                      height="120"
                    />
                  </center>
                );
              })} */}
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Scheduler;
