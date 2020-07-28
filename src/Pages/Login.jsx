import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>Login</h1>
          <hr className="deco-line" />
        </div>
        <div className="form-box">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
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

export default Login;
