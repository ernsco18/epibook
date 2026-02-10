import { Card } from "react-bootstrap";
import { useState } from "react";

const SingleBook = function (props) {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Card
        onClick={() =>
          // this.setState({ selected: !this.state.selected })
          setSelected(selected === true ? false : true)
        }
        style={{ border: selected ? "3px solid red" : "none" }}
      >
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
