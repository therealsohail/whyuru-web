import React, { Component } from "react";
import Banner from "../Components/Banner";
import OpportunityMeeting from "../Components/OpportunityMeeting";
import Qoutes from "../Components/Qoutes";
import Footer from "../Components/Footer";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Banner />
        <OpportunityMeeting />
        <Qoutes />
        <Footer />
      </div>
    );
  }
}

export default Home;
