import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { useState } from "react";

export default function PostForm({ create }) {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    <>
      <form>
        <MyInput
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="create title"
        />
        <MyInput
          type="text"
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          value={post.body}
          placeholder="create description"
        />
        <MyButton onClick={addNewPost}>create post</MyButton>
      </form>
    </>
  );
}
