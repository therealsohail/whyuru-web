import React, { useState, useEffect } from "react";
import { client } from "../client";
import BlogCard from "./BlogCard";

const BlogGallery = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        limit: props.limit,
        content_type: "blog",
      })
      .then((res, index) => {
        setBlogs(res.items);
      });
  }, []);

  return (
    <div className="container" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <h3
        style={{
          fontFamily: "Montserrat",
          textAlign: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        The Latest Blog Post
      </h3>
      <div className="row">
        {blogs &&
          blogs.map((blog, index) => {
            const {
              sys: { id },
            } = blog;

            return (
              <div className="col-sm-4" key={index}>
                <BlogCard key={id} post={blog} />
              </div>
            );
          })}
      </div>
      <br />
      <br />
    </div>
  );
};

export default BlogGallery;
