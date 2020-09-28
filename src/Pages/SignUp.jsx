import React, { useState, useContext } from "react";
import { Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";

import { signupValidator } from "../validators";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebaseConfig";

const SignUp = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fbError, setFbError] = useState();
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [proceed, setProceed] = useState(false);
  const [emailCount, setEmailCount] = useState(null);

  const [validate, setValidate] = useState(false);

  const [error, setError] = useState({});

  const { currentUser } = useContext(AuthContext);

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

  const { errors, valid } = signupValidator(credientials);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidate(true);
    const { errors, valid } = signupValidator(credientials);
    if (valid) {
      if (valid && proceed) {
        setLoading(true);
        setTimeout(() => setLoading(false), 5000);
      }

      db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          setEmailCount(querySnapshot.docs.length);
          console.log(querySnapshot.docs.length);
          if (querySnapshot.docs.length > 0) {
            setEmailError("Email already exist");
          } else {
            setEmailError(null);
            setProceed(true);
          }
        });
    } else if (!valid) {
      setError({ ...errors });

      if (password.length < 6) {
        setPasswordError("Password must be greater than 6 letters.");
      } else if (password.length >= 6) {
        setPasswordError(null);
      }
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          setEmailCount(querySnapshot.docs.length);
          console.log(querySnapshot.docs.length);
          if (querySnapshot.docs.length > 0) {
            setEmailError("Email already exist");
          }
        });
    }
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

  const showPasswordError = () => {
    if (passwordError !== null) {
      return (
        <div className="col-sm-12">
          <div
            class="alert alertBox alert-danger alert-dismissible fade show"
            role="alert"
          >
            Password should be more than 6 character
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    }
  };

  const showEmailError = () => {
    if (emailError !== null) {
      return (
        <div className="col-sm-12">
          <div
            class="alert alertBox alert-danger alert-dismissible fade show"
            role="alert"
          >
            Email Already exists
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    }
  };

  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }
  console.log(errors, valid, proceed);
  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>SignUp</h1>
          <hr className="deco-line" />
          {showEmailError()}

          {showPasswordError()}
          {wrongCred}
        </div>
        <div className="form-box">
          <Form noValidate validated={validate} onSubmit={handleSubmit}>
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            {valid && proceed ? (
              <Link
                to={{
                  pathname: "/signup/checkout",
                  state: {
                    fname: credientials.fname,
                    lname: credientials.lname,
                    email: credientials.email,
                    password: credientials.password,
                  },
                }}
              >
                <Button
                  variant="outline-success"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : null}
                  Proceed
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline-primary"
                disabled={loading}
                type="submit"
              >
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
            )}
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
