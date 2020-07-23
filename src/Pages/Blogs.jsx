import React from "react";
import blogPic from "../Assets/blog.jpg";
import { Banner } from "../Components/Banner";
import BlogGallery from "../Components/BlogGallery";

const Blogs = () => {
  return (
    <>
      <Banner pic={blogPic} heading="Blogs" />
      <BlogGallery limit="100" />
    </>
  );
};

export default Blogs;
