import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { app, db } from "../firebaseConfig";
import { withRouter } from "react-router-dom";

const PayPal = ({ credientials, history }) => {
  const userInfo = {
    fname: credientials.fname,
    lname: credientials.lname,
    email: credientials.email,
    createdAt: new Date().toISOString(),
    isRegistered: true,
  };
  return (
    <PayPalButton
      amount="30"
      currency="USD"
      onSuccess={(details, data) => {
        app
          .auth()
          .createUserWithEmailAndPassword(
            credientials.email,
            credientials.password
          )
          .then((res) => {
            console.log(res);
            return db.collection("users").doc(res.user.uid).set(userInfo);
          })
          .then(() => {
            // alert("Paypent successfull by: " + details.payer.name.given_name);
            history.push("/login");
          })
          .catch((err) => {
            console.log(err);
            if (err.code === "auth/email-already-in-use") {
              alert("Email Already in use");
            }
          });
      }}
      options={{
        clientId:
          "AXwzM--jRbQvWk4SuTJvrqYp_fjATlolaz0Bxqd53B12x05V6PEbQ-PzJhvbLHbGsnTFRxhnVqo8hkSd",
      }}
    />
  );
};

export default withRouter(PayPal);
