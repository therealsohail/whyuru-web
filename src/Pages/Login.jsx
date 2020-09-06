import React, { useState, useContext } from "react";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";

import { app } from "../firebaseConfig";
import { validateLogin } from "../validators";
import { AuthContext } from "../Context/AuthContext";
import { Alert } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState({});
  const [fbError, setFbError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, valid } = validateLogin(email, password);

    if (valid) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          props.history.push("/");
        })
        .catch((err) => {
          console.error(err);
          var errorCode = err.code;
          var errorMessage = err.message;

          if (errorCode === "auth/wrong-password") {
            setFbError("Wrong email or password");
          }
        });
    } else if (!valid) {
      setError({ ...errors });
    }
    setValidate(true);
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const wrongCred =
    fbError === "Wrong email or password" ? (
      <Alert className="form-box" style={{ padding: 10 }} variant="danger">
        Invalid Email or password
      </Alert>
    ) : null;

  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const emailAlert = error.email ? (
    <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
  ) : null;

  const passwordAlert = error ? (
    <Form.Control.Feedback type="invalid">
      {error.password}
    </Form.Control.Feedback>
  ) : null;

  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>Login</h1>
          <hr className="deco-line" />
          {wrongCred}
        </div>
        <div className="form-box">
          <Form noValidate onSubmit={handleSubmit} validated={validate}>
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
                  required
                  id="password"
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

            <Button variant="outline-primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              Login
            </Button>
          </Form>
        </div>
      </div>
      <div className="poster col-sm-4">
        <div className="text">
          <h2>Register Now!</h2>
          <Link to="/signup">
            <button className="login-button">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
