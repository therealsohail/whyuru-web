import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";

import schedulerPic from "../Assets/scheduler.jpg";
import { Banner } from "../Components/Banner";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

class Scheduler extends React.Component {
  state = {
    sidebarOpen: false,
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  sidebarCloseHandler = () => {
    this.setState({
      sidebarOpen: false,
    });
  };

  monthsName = [
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

  dt = new Date();
  year = this.dt.getFullYear();
  month = this.dt.getMonth() + 1;
  day = this.dt.getDate();
  formattedYear =
    this.month.toString().length === 1 ? `0${this.month}` : this.month;

  date = `${this.year}-${this.formattedYear}-${this.day}`;

  monthNumber = this.dt.getMonth();
  // let year = d.getFullYear();
  // let day = d.getDate();
  sun = [];
  mon = [];
  tue = [];
  wed = [];
  thu = [];
  fri = [];
  sat = [];

  componentDidMount() {
    axios
      .post("https://whyuruapi.herokuapp.com/api/WeeklySchedulers", {
        date: this.date,
      })
      .then((res) => {
        let response = res.data;
        response.forEach((obj) => {
          if (obj.day === "Sunday") {
            if (obj) {
              this.setState({ sunday: [...this.state.sunday, obj] });
            }
          }
          if (obj.day === "Monday") {
            if (obj) {
              this.setState({ monday: [...this.state.monday, obj] });
            }
          }
          if (obj.day === "Tuesday") {
            if (obj) {
              this.setState({ tuesday: [...this.state.tuesday, obj] });
            }
          }
          if (obj.day === "Wednesday") {
            if (obj) {
              this.setState({ wednesday: [...this.state.wednesday, obj] });
            }
          }
          if (obj.day === "Thursday") {
            if (obj) {
              this.setState({ thursday: [...this.state.thursday, obj] });
            }
          }
          if (obj.day === "Friday") {
            if (obj) {
              this.setState({ friday: [...this.state.friday, obj] });
            }
          }
          if (obj.day === "Saturday") {
            if (obj) {
              this.setState({ saturday: [...this.state.saturday, obj] });
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSideBar = () => {
    console.log("button clicked");
    this.setState({
      sidebarOpen: true,
    });
  };

  render() {
    let sidebar = this.state.sidebarOpen ? (
      <Sidebar close={this.sidebarCloseHandler} sidebar="sidebar" />
    ) : null;
    return (
      <>
        {sidebar}

        <Banner pic={schedulerPic} heading="Scheduler" />
        <h1 style={{ paddingTop: 30, paddingLeft: 50 }}>
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {`${this.monthsName[this.monthNumber]}`}{" "}
          </span>{" "}
          <span style={{ fontWeight: 400 }}>{`${this.year}`}</span>
        </h1>

        <Button
          style={{ marginTop: 30 }}
          className="add-button"
          bsStyle="primary"
          onClick={this.handleSideBar}
        >
          Add Schedule
        </Button>

        <hr style={{ clear: "both" }} />
        <div className="container horizontal-scrollable">
          <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4">
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Sunday</h4>
              {this.state.sunday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Monday</h4>
              {this.state.monday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Tuesday</h4>
              {this.state.tuesday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Wednesday</h4>
              {this.state.wednesday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Thursday</h4>
              {this.state.thursday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Friday</h4>
              {this.state.friday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-sm-4">
              <h4 style={{ textAlign: "center" }}>Saturday</h4>
              {this.state.saturday.map((alarm) => {
                return (
                  <div className="scheduler-card">
                    <h6 className="time">{alarm.time}</h6>
                    <hr />
                    <div className="scheduler-card-deck">
                      {alarm.data.map((item) => {
                        return (
                          <img
                            className="scheduler-img"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
        </div>
      </>
    );
  }
}

export default Scheduler;
