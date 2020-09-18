import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Scheduler from "./Scheduler";

const SchedulerFunc = () => {
  const { currentUser } = useContext(AuthContext);

  return <Scheduler userId={currentUser.uid} />;
};

export default SchedulerFunc;
