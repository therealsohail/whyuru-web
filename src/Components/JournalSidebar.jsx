import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebaseConfig";

const JournalSidebar = (props) => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(currentUser.uid);
  const [intials, setIntials] = useState("");
  const [fbData, setFbData] = useState([]);
  const [fbDataId, setFbDataId] = useState({});

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
          const fnameInitials = doc.data().fname.split("")[0];
          const lnameInitials = doc.data().lname.split("")[0];
          setIntials(fnameInitials + lnameInitials);
        }
      })
      .catch((err) => console.error(err));
    let array = [];
    db.collection("journals")
      .where("userId", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        fbData.push(array);
        setFbData(fbData[0]);
      })
      .catch((err) => console.error(err));
  }, []);
  const changeToggle = () => {
    if (toggle) {
      setToggle(false);
    } else if (toggle === false) {
      setToggle(true);
    }
  };

  return (
    <div className={toggle ? "d-flex toggled" : "d-flex"} id="wrapper">
      <div className="bg-dark border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            Whyuru
          </Link>
        </div>
        <div className="list-group list-group-flush">
          <Link
            to="/createjournal"
            className="list-group-item list-group-item-action bg-dark"
          >
            <span>
              <i style={{ marginRight: 5 }} className="fas fa-plus"></i>
            </span>
            {"  "}
            Create New Entry
          </Link>
          {fbData.map((item) => {
            return (
              <Link
                to={`/journal/${item.id}`}
                key={item.id}
                className="list-group-item list-group-item-action bg-dark"
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button
            className="btn btn-primary"
            id="menu-toggle"
            onClick={() => changeToggle()}
          >
            Toggle Menu
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => changeToggle()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-nav ml-auto avatar-circle">
            <span className="initials">{intials}</span>
          </div>
        </nav>
        <div
          style={{ width: 1000, margin: "auto" }}
          className="container content"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default JournalSidebar;
