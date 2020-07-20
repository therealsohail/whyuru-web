import React, { useState } from "react";
import { useEffect } from "react";
import { client } from "../client";
import Carousel from "react-bootstrap/Carousel";
import pic from "../Assets/wakeup.jpg";

const Testimonials = () => {
  const [testimonials, setTestimonial] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "testimonial",
      })
      .then((res) => {
        console.log(res.items);
        setTestimonial(res.items);
      });
  }, []);

  const style = {
    backgroundImage: "url(" + pic + ")",
  };

  return (
    <div className="row">
      <Carousel className="carousel" controls={false} indicators={false}>
        {testimonials &&
          testimonials.map((testimonial, index) => {
            const {
              fields: { name, review, occupation },
            } = testimonial;
            return (
              <Carousel.Item>
                <p className="test-review">{review}</p>
                <h3 className="test-name"> - {name}</h3>
                <p className="test-occupation">{occupation}</p>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default Testimonials;
