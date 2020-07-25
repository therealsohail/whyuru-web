import React, { useEffect, useState } from "react";

import { Banner } from "../Components/Banner";
import wakeup from "../Assets/wakeup.jpg";
import { client } from "../client";

const Delta = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "frequency",
        "fields.type[match]": "Delta",
      })
      .then((res) => {
        console.log(res.items);
        setPosts(res.items);
      });
  }, []);

  return (
    <>
      <Banner pic={wakeup} heading="Delta" />
      <div className="container">
        {posts &&
          posts.map((post, index) => {
            const {
              fields: {
                content,
                image: {
                  fields: {
                    file: { url },
                  },
                },
              },
            } = post;
            return (
              <>
                <center>
                  <img className="freq-image" src={url} alt="" />
                </center>
                <p className="freq-content">{content}</p>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Delta;
