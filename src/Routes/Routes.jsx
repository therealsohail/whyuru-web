import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import BigFive from "../Pages/BigFive";
import TheMind from "../Pages/TheMind";
import Bedtime from "../Pages/Bedtime";
import Navbar from "../Components/Navbar";
import Wakeup from "../Pages/Wakeup";

class Routes extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <div>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/bedtime" component={Bedtime} />
              <Route path="/wakeup" component={Wakeup} />
              <Route path="/BigFive" component={BigFive} />
              <Route path="/TheMind" component={TheMind} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
