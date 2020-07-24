import React, { useEffect } from "react";
import { BlogBanner } from "../Components/Banner";
import { client } from "../client";
import { useState } from "react";

import Footer from "../Components/Footer";

const BlogPost = (props) => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "blog",
        "sys.id[match]": props.match.params.id,
      })
      .then((res) => {
        console.log(res.items);
        setBlog(res.items);
      });
  }, []);

  //   const {
  //     fields: {
  //       title,
  //       content,
  //       createdAt,
  //       image: {
  //         fields: {
  //           file: { url },
  //         },
  //       },
  //     },
  //   } = blog;

  return (
    <>
      {blog ? (
        blog.map((blg) => {
          const {
            fields: {
              title,
              content,
              createdAt,
              image: {
                fields: {
                  file: { url },
                },
              },
            },
          } = blg;
          return (
            <>
              <BlogBanner pic={url} />
              <div className="container">
                <h1 className="blog-title">{title}</h1>
                <p className="blog-content">{content}</p>
              </div>
            </>
          );
        })
      ) : (
        <h1>Post Not Found</h1>
      )}
      <Footer />
    </>
  );
};

export default BlogPost;
