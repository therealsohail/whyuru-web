import React, { Component } from "react";
import "../Styles/Style.css";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <header className="header">
        <nav
          id="navbar"
          className="navbar navbar-expand-sm fixed-top navbar-dark bg-light"
        >
          <NavLink to="/" className="navbar-brand ">
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

          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link ">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" className="nav-link ">
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Frequency
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/delta" className="dropdown-item">
                    Delta
                  </Link>
                  <Link to="/theta" className="dropdown-item">
                    Theta
                  </Link>
                  <Link to="/alpha" className="dropdown-item">
                    Alpha
                  </Link>
                  <Link to="/beta" className="dropdown-item">
                    Beta
                  </Link>
                  <Link to="/gamma" className="dropdown-item">
                    Gamma
                  </Link>
                  <Link to="/symphony" className="dropdown-item">
                    Symphony
                  </Link>
                  <Link to="/flow" className="dropdown-item">
                    Flow
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <NavLink to="/wakeup" className="nav-link ">
                  Wakeup
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/bedtime" className="nav-link ">
                  Bedtime
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
