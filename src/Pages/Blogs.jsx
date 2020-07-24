import React from "react";
import blogPic from "../Assets/blog.jpg";
import { Banner } from "../Components/Banner";
import BlogGallery from "../Components/BlogGallery";
import Footer from "../Components/Footer";

const Blogs = () => {
  return (
    <>
      <Banner pic={blogPic} heading="Blogs" />
      <BlogGallery limit="100" />
      <Footer />
    </>
  );
};

export default Blogs;
