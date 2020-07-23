import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const {
    sys: { id },
  } = props.post;
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
  } = props.post;
  return (
    <Card style={{ width: "6rem", flex: 1 }} key={id}>
      <Card.Img variant="top" src={url} width="286" height="230" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content.substr(0, 150)}...</Card.Text>
        <Link to={`/blog/${id}`}>
          <Button variant="outline-primary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
