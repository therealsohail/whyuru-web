import React, { createContext, useReducer, useEffect, useState } from "react";
import { client } from "../client";
import { BedtimeReducer } from "../Reducers/BedtimeReducer";

export const BedtimeContext = createContext();

export const BedtimeContextProvider = (props) => {
  const [content, dispatch] = useReducer(BedtimeReducer, []);

  useEffect(() => {
    client
      .getEntries({
        content_type: "bedtime",
      })
      .then((res) => {
        dispatch({ type: "DATA", payload: res.items });
      });
  }, []);

  return (
    <BedtimeContext.Provider value={{ content, dispatch }}>
      {props.children}
    </BedtimeContext.Provider>
  );
};
