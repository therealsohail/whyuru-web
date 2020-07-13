import React, { Component } from "react";
import "../Styles/Style.css";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <header className="header">
        <nav
          id="navbar"
          className="navbar navbar-expand-lg fixed-top navbar-dark bg-light"
        >
          <div className="container">
            <NavLink to="#" className="navbar-brand ">
              Whyuru{" "}
            </NavLink>
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggler navbar-toggler-right"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              id="navbarSupportedContent"
              className="collapse navbar-collapse"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item active">
                  <NavLink to="#" className="nav-link ">
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="#" className="nav-link ">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="#" className="nav-link ">
                    Gallery
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="#" className="nav-link ">
                    Portfolio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="#" className="nav-link ">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
