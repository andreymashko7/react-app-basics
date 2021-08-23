import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "./../API/PostService";
import { useEffect, useState } from "react";
import Loader from "./../components/UI/Loader/Loader";

const PostIdPage = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ justifyContent: "center", display: "flex" }}>
        this is page about post with id = {params.id}
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h3>Comments:</h3>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div style={{ marginTop: 15 }} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
