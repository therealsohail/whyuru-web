import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, withRouter, Redirect, Route } from "react-router-dom";
import PayPal from "../Components/Paypal";
import { signupValidator } from "../validators";

const PaymentCheckout = ({ history, location }) => {
  console.log(location.state);
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [valid, setValid] = useState(true);
  const [credientials, setCredientials] = useState({});

  useEffect(() => {
    if (location.state === undefined) {
      setValid(false);
    } else {
      setValid(true);
      setCredientials({
        fname: location.state.fname,
        lname: location.state.lname,
        email: location.state.email,
        password: location.state.password,
      });
    }
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 5000);
  // };
  const paypalCheckout = (e) => {
    e.preventDefault();
    setCheckout(true);
  };
  const handleCheckoutButtons = () => {
    if (checkout === false) {
      return (
        <Button
          onClick={paypalCheckout}
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
          Paypal Checkout
        </Button>
      );
    } else {
      return <PayPal credientials={credientials} />;
    }
  };

  return valid ? (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>Checkout</h1>
          <hr className="deco-line" />
        </div>
        <div className="form-box">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          {handleCheckoutButtons()}
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
  ) : (
    <Redirect to="/signup" />
  );
};

export default withRouter(PaymentCheckout);
