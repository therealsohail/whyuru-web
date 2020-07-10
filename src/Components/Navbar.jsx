import React, { Component } from "react";
import "../Styles/Style.css";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <NavLink className="navbar-brand text-light" to="/" exact>
            WHYURU
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink
                  activeClassName="activate"
                  className="nav-link text-light"
                  to="/"
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  activeClassName="activate"
                  className="nav-link text-light"
                  to="/BigFive"
                  exact
                >
                  Big Five
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  activeClassName="activate"
                  className="nav-link text-light"
                  to="/TheMind "
                  exact
                >
                  The Mind
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
