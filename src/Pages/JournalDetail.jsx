import React from "react";
import JournalSidebar from "../Components/JournalSidebar";
import { db } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

const JournalDetail = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState({});

  useEffect(() => {
    db.collection("journals")
      .doc(props.match.params.journalId)
      .get()
      .then((doc) => {
        setData({ ...doc.data() });
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(props);
  }, []);

  return (
    <>
      <JournalSidebar>
        <h1>{data.title}</h1>
        {ReactHtmlParser(data.content)}
      </JournalSidebar>
    </>
  );
};

export default JournalDetail;
