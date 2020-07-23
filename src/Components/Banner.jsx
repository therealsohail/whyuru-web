import React, { Component } from "react";
import "../Styles/Style.css";

export class Banner extends Component {
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

export class BlogBanner extends Component {
  render() {
    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(  ${this.props.pic}  )`,
    };
    return (
      <div style={style} className="blog-banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 blog-banner-content">
              <h1 className="text-light blog-banner-heading">
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
