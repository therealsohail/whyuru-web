import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

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
import { AuthProvider } from "../Context/AuthContext";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Scheduler from "../Pages/Scheduler";
import Journals from "../Pages/Journals";
import CreateJournal from "../Pages/CreateJournal";
import JournalDetail from "../Pages/JournalDetail";
import TheBrain from "../Pages/The Mind/TheBrain";
import Consciousness from "../Pages/The Mind/Consciousness";
import LimbicSystem from "../Pages/The Mind/LimbicSystem";
import Cortex from "../Pages/The Mind/Cortex";
import Cerebellum from "../Pages/The Mind/Cerebellum";
import Unconscious from "../Pages/The Mind/Unconscious";
import Emotions from "../Pages/The Mind/Emotions";

const Main = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/journals" &&
        location.pathname !== "/createjournal" &&
        location.pathname !== "/journal/:journalId" && <Navbar />}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/bedtime" component={Bedtime} />
        <PrivateRoute path="/wakeup" component={Wakeup} />
        <Route path="/alpha" component={Alpha} />
        <Route path="/delta" component={Delta} />
        <Route path="/theta" component={Theta} />
        <Route path="/beta" component={Beta} />
        <Route path="/gamma" component={Gamma} />
        <Route path="/symphony" component={Symphony} />
        <Route path="/flow" component={Flow} />
        <Route path="/BigFive" component={BigFive} />
        <Route path="/consciousness" component={Consciousness} />
        <Route path="/thebrain" component={TheBrain} />
        <Route path="/limbicsystem" component={LimbicSystem} />
        <Route path="/cortex" component={Cortex} />
        <Route path="/cerebullum" component={Cerebellum} />
        <Route path="/unconscious" component={Unconscious} />
        <Route path="/emotions" component={Emotions} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/blogs" component={Blogs} />
        <PrivateRoute path="/scheduler" component={Scheduler} />
        <PrivateRoute path="/journals" component={Journals} />
        <PrivateRoute path="/createjournal" component={CreateJournal} />
        <PrivateRoute path="/journal/:journalId" component={JournalDetail} />
      </Switch>
    </div>
  );
});

const Routes = ({ location }) => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
