import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
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

  const [error, setError] = useState({});

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
      console.log(error);
    }
  };

  const emailAlert = error ? (
    <Alert variant="danger">{error.email}</Alert>
  ) : null;
  const fnameAlert =
    error.fname === "Must not be empty" ? (
      <Alert variant="danger">{error.fname}</Alert>
    ) : null;
  const lnameAlert = error ? (
    <Alert variant="danger">{error.lname}</Alert>
  ) : null;
  const passwordAlert = error ? (
    <Alert variant="danger">{error.password}</Alert>
  ) : null;
  const confirmPasswordAlert = error ? (
    <Alert variant="danger">{error.confirmpassword}</Alert>
  ) : (
    ""
  );

  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>SignUp</h1>
          <hr className="deco-line" />
          {emailAlert}
          {fnameAlert}
          {lnameAlert}
          {passwordAlert}
          {confirmPasswordAlert}
        </div>
        <div className="form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                bsStyle={error.fname ? "danger" : null}
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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

export default SignUp;
