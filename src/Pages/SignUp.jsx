import React, { useState } from "react";
import { Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { app, db } from "../firebaseConfig";
import { signupValidator } from "../validators";

const SignUp = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fbError, setFbError] = useState();

  const [validate, setValidate] = useState(false);

  const [error, setError] = useState({});

  console.log(error);

  const credientials = {
    fname,
    lname,
    email,
    password,
  };

  const userInfo = {
    fname: credientials.fname,
    lname: credientials.lname,
    email: credientials.email,
    createdAt: new Date().toISOString(),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, valid } = signupValidator(credientials);

    if (valid) {
      setLoading(true);
      setTimeout(() => setLoading(false), 5000);
      app
        .auth()
        .createUserWithEmailAndPassword(
          credientials.email,
          credientials.password
        )
        .then((res) => {
          return db.collection("users").doc(res.user.uid).set(userInfo);
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "auth/email-already-in-use") {
            setFbError("Email already in use");
          }
        });
    } else if (!valid) {
      setError({ ...errors });
    }
    setValidate(true);
  };

  const wrongCred =
    fbError === "Email already in use" ? (
      <Alert className="form-box" style={{ padding: 10 }} variant="danger">
        Email already in use
      </Alert>
    ) : null;

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
          {wrongCred}
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

            <Button variant="outline-primary" disabled={loading} type="submit">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
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
