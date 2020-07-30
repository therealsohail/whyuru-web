import React, { Component, useContext } from "react";
import "../Styles/Style.css";
import { Link, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { app } from "../firebaseConfig";

const Navbar = () => {
  
  const { currentUser } = useContext(AuthContext);
  const signOut = currentUser ? (
    <Button variant="primary" onClick={() => app.auth().signOut()}>
      Sign Out
    </Button>
  ) : (
    null
  );
  return (
    <header id="header" className="header">
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

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                The Mind
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/consciousness" className="dropdown-item">
                  Consciousness
                </Link>
                <Link to="/thebrain" className="dropdown-item">
                  The Brain
                </Link>
                <Link to="/limbicsystem" className="dropdown-item">
                  Limbic System
                </Link>
                <Link to="/cortex" className="dropdown-item">
                  Cortex
                </Link>
                <Link to="/cerebellum" className="dropdown-item">
                  Cerebellum
                </Link>
                <Link to="/unconscious" className="dropdown-item">
                  Unconscious
                </Link>
                <Link to="/emotions" className="dropdown-item">
                  Emotions
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
            <li className="nav-item">{signOut}</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
