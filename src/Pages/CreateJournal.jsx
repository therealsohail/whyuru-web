import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Button, Spinner } from "react-bootstrap";

import JournalSidebar from "../Components/JournalSidebar";
import { db } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const CreateJournal = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const userId = currentUser.uid;

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSubmit = () => {
    db.collection("journals")
      .add({
        userId,
        title,
        content,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        setLoading(false);
        console.log("uploaded");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <JournalSidebar>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Editor
            apiKey="a1ykfkcv4tpum8ske4uftjpjea2lziy8lmkpq4br0y1g2oyw"
            init={{
              height: 500,
              menubar: true,
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          onClick={() => setLoading(true)}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          Submit
        </Button>
      </JournalSidebar>
    </>
  );
};

export default CreateJournal;
