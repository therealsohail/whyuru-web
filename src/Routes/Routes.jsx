import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import BigFive from "../Pages/BigFive";
import TheMind from "../Pages/TheMind";
import Bedtime from "../Pages/Bedtime";
import Navbar from "../Components/Navbar";
import Wakeup from "../Pages/Wakeup";
import BlogPost from "../Pages/BlogPost";
import Blogs from "../Pages/Blogs";
import Alpha from "../Pages/Alpha";
import Delta from "../Pages/Delta";
import Theta from "../Pages/Theta";
import Beta from "../Pages/Beta";
import Gamma from "../Pages/Gamma";
import Symphony from "../Pages/Symphony";
import Flow from "../Pages/Flow";

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
              <Route path="/alpha" component={Alpha} />
              <Route path="/delta" component={Delta} />
              <Route path="/theta" component={Theta} />
              <Route path="/beta" component={Beta} />
              <Route path="/gamma" component={Gamma} />
              <Route path="/symphony" component={Symphony} />
              <Route path="/flow" component={Flow} />
              <Route path="/BigFive" component={BigFive} />
              <Route path="/TheMind" component={TheMind} />
              <Route path="/blog/:id" component={BlogPost} />
              <Route path="/blogs" component={Blogs} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
