import "../App.css";
import { useState, useEffect, useRef } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "./../hooks/useObserver";

// import PostService from "./API/PostService";
// import PostList from "./components/PostList";
// import PostForm from "./components/PostForm";
// import PostFilter from "./components/PostFilter";
// import MyModal from "./components/UI/myModal/MyModal";
// import MyButton from "./components/UI/button/MyButton";
// import Loader from "./components/UI/Loader/Loader";
// import Pagination from "./components/UI/pagination/Pagination";

// import MyButton from "./components/UI/button/MyButton";
// import MySelect from "./components/UI/select/MySelect";
// import MyInput from "./components/UI/input/MyInput";
import PostService from "./../API/PostService";
import PostList from "./../components/PostList";
import PostForm from "./../components/PostForm";
import PostFilter from "./../components/PostFilter";
import MyModal from "./../components/UI/myModal/MyModal";
import MyButton from "./../components/UI/button/MyButton";
import Loader from "./../components/UI/Loader/Loader";
import Pagination from "./../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  // const [selectedSort, setSelectedSort] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [body, setBody] = useState("");
  // const [title, setTitle] = useState("");

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    // fetchPosts(limit, page);
  };

  // const sortPosts = (sort) => {
  //   setSelectedSort(sort);
  // };

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  return (
    <div className="App">
      <button onClick={fetchPosts}> Get posts</button>
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Elements per page"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "show all" },
        ]}
      />
      {/* {sortedAndSearchedPosts.length !== 0 ? ( */}
      {/* ) : ( */}
      {/* )} */}

      {postError && <h1>Error ${postError}</h1>}

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Posts about js"}
      />
      <div ref={lastElement} style={{ height: 20, background: "teal" }} />

      {isPostLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}
