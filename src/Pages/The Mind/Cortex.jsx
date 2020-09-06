import React, { useEffect, useState } from "react";

import { Banner } from "../../Components/Banner";
import themind from "../../Assets/themind.jpg";
import { client } from "../../client";

const Cortex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "theMind",
        "fields.type[match]": "Cortex",
      })
      .then((res) => {
        setPosts(res.items);
      });
  }, []);

  return (
    <>
      <Banner pic={themind} heading="Cortex" />
      <div className="container">
        {posts &&
          posts.map((post, index) => {
            const {
              fields: {
                content,
                media: {
                  fields: {
                    file: { url },
                  },
                },
              },
            } = post;
            return (
              <div key={index}>
                <center>
                  <img className="freq-image" src={url} alt="" />
                </center>
                <p className="freq-content">{content}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Cortex;
