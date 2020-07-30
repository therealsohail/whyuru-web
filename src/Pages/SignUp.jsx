import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { app, db } from "../firebaseConfig";
import { useEffect } from "react";
import { signupValidator } from "../validators";

const SignUp = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validate, setValidate] = useState(false);

  const [error, setError] = useState({});

  console.log(error);

  const credientials = {
    fname,
    lname,
    email,
    password,
    confirmPassword,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, valid } = signupValidator(credientials);

    if (valid) {
      app
        .auth()
        .createUserWithEmailAndPassword(
          credientials.email,
          credientials.password
        )
        .then((res) => {
          return db.collection("users").doc(res.user.uid).set(credientials);
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!valid) {
      setError({ ...errors });
    }
    setValidate(true);
  };

  const emailAlert = error.email ? (
    <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
  ) : null;
  const fnameAlert = error.fname ? (
    <Form.Control.Feedback type="invalid">{error.fname}</Form.Control.Feedback>
  ) : null;
  const lnameAlert = error ? (
    <Form.Control.Feedback type="invalid">{error.lname}</Form.Control.Feedback>
  ) : null;
  const passwordAlert = error ? (
    <Form.Control.Feedback type="invalid">
      {error.password}
    </Form.Control.Feedback>
  ) : null;

  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>SignUp</h1>
          <hr className="deco-line" />
        </div>
        <div className="form-box">
          <Form noValidate validated={validate} onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                bsStyle={error.fname ? "danger" : null}
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              {fnameAlert}
            </Form.Group>
            <Form.Group controlId="formGroupLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              {lnameAlert}
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailAlert}
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  id="password"
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    id="showButton"
                    onClick={showPassword}
                  >
                    <i className="fas fa-eye"></i>
                  </Button>
                </InputGroup.Append>
                {passwordAlert}
              </InputGroup>
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <div className="poster col-sm-4">
        <div className="text">
          <h2>Already Have An Account?</h2>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
