import React, { useState } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import { Nav } from "react-bootstrap";

class Time extends React.Component {
  state = {
    m: moment(),
  };

  handleChange = (m) => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log("saved", this.state.m.format("llll"));
  };
  render() {
    return (
      <div>
        <form>
          <div className="input">
            <input type="text" value={this.state.m.format("llll")} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
          />
        </form>

        <Nav fill variant="pills" defaultActiveKey="#">
          <Nav.Item>
            <Nav.Link href="#">Wakeup</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Bedtime</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default Time;
