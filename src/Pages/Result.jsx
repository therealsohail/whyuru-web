import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import BigFiveNavbar from "../Components/BigFiveNavbar";
import ResultChart from "../Components/ResultChart";

class Result extends React.Component {
  state = {};
  render() {
    console.log(this.props.location.state);
    return (
      <>
        <BigFiveNavbar />
        <ResultChart data={{ ...this.props.location.state }} />
        <center>
          <Link to="/bigfive">
            <Button
              onClick={this.props.resetScore}
              style={{ marginTop: 10 }}
              variant="primary"
              size="lg"
            >
              Restart
            </Button>
          </Link>
        </center>
      </>
    );
  }
}

export default Result;
