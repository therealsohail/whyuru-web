import React, { Component } from "react";
import "../Styles/Style.css";

class Banner extends Component {
  state = {};

  render() {
    const style = {
      backgroundImage: "url(" + this.props.pic + ")",
    };
    return (
      <div style={style} className="banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 banner-content">
              <h1 className="text-light banner-heading">
                {this.props.heading}
              </h1>
              <p className="text-light">{this.props.subHeading}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
