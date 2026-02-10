import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = function (props) {
  const [state, setState] = useState({
    state: {
      comments: [],
      isLoading: true,
      isError: false,
    },
  });

  const funzione = async () => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTczNDc3Mjg1ZTNiMTAwMTViNWVlMGIiLCJpYXQiOjE3NzA2NDk3NzUsImV4cCI6MTc3MTg1OTM3NX0.gsGyNu658FIcWLgH-IPvWcp2gzC3dj__gtFvWIElkLo",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setState({ comments: comments, isLoading: false, isError: false });
      } else {
        setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      setState({ isLoading: false, isError: true });
    }
  };

  useEffect(() => {
    funzione();
  }, []);

  return (
    <div className="text-center">
      {state.isLoading && <Loading />}
      {state.isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={state.comments} />
    </div>
  );
};

export default CommentArea;
