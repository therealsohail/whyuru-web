import React, { Component } from "react";
import "../Styles/Style.css";

class Banner extends Component {
  state = {};
  render() {
    return (
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 banner-content">
              <h1 className="text-light banner-heading">
                Lorem Ipsum set amet
              </h1>
              <p className="text-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
