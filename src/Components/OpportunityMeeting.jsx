import React, { Component } from "react";

class OpportunityMeeting extends Component {
  state = {};
  render() {
    let image = require("../Assets/brain.png");
    return (
      <div className="container opp-meeting">
        <h4 className="opp-heading">Oportunity meeting preperation</h4>
        <div className="row opp-row">
          <div className="col-sm-6 opp-container">
            <img
              className="opp-image img-fluid"
              style={{ width: "200px" }}
              src={image}
              alt=""
            />
          </div>
          <div className="col-sm-6 opp-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>

        <div className="row opp-row">
          <div className="col-sm-6 opp-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="col-sm-6 opp-container">
            <img className="opp-image" src={image} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default OpportunityMeeting;
