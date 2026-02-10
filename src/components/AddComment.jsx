import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const AddComment = function (props) {
  const [state, setState] = useState({
    comment: {
      comment: "",
      rate: 1,
      elementId: props.asin,
    },
  });

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(state.comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTczNDc3Mjg1ZTNiMTAwMTViNWVlMGIiLCJpYXQiOjE3NzA2NDk3NzUsImV4cCI6MTc3MTg1OTM3NX0.gsGyNu658FIcWLgH-IPvWcp2gzC3dj__gtFvWIElkLo",
        },
      });
      if (response.ok) {
        alert("Recensione inviata!");
        setState({
          comment: {
            comment: "",
            rate: 1,
            elementId: props.asin,
          },
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={state.comment.comment}
            onChange={(e) =>
              setState({
                comment: {
                  ...state.comment,
                  comment: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={state.comment.rate}
            onChange={(e) =>
              setState({
                comment: {
                  ...state.comment,
                  rate: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
