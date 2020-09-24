import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const PaymentCheckout = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  };

  return (
    <div className="main row">
      <div className="signup col-sm-8">
        <div className="signup-heading">
          <h1>Checkout</h1>
          <hr className="deco-line" />
        </div>
        <div className="form-box">
          <p>
            Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
            IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem Ipsum Lorem IpsumLorem
            IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
            IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
            IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem
            IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
            IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
            IpsumLorem IpsumLorem IpsumLorem Ipsum
          </p>

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
            Proceed Checkout
          </Button>
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

export default withRouter(PaymentCheckout);
