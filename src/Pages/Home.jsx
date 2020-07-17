import React, { Component } from "react";
import Banner from "../Components/Banner";
import OpportunityMeeting from "../Components/OpportunityMeeting";
import Qoutes from "../Components/Qoutes";
import Footer from "../Components/Footer";

import hero from "../Assets/Banner.jpg";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Banner
          pic={hero}
          heading="Lorem Ipsum set amet"
          subHeading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
        <OpportunityMeeting />
        <Qoutes />
        <Footer />
      </div>
    );
  }
}

export default Home;
