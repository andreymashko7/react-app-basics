import { useHistory } from "react-router-dom";
import MyButton from "./UI/button/MyButton";
import React from "react";

export default function PostItem(props) {
  const router = useHistory();

  return (
    <div className="post">
      <div className="post-content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post-btn">
        <MyButton
          onClick={() => {
            router.push(`/posts/${props.post.id}`);
          }}
        >
          open
        </MyButton>
        <MyButton
          onClick={() => {
            props.remove(props.post);
          }}
        >
          delete
        </MyButton>
      </div>
    </div>
  );
}
