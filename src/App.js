import { AuthContext } from "./context/index";
import { HashRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
// import About from "./pages/About";
// import Posts from "./pages/Posts";
// import Error from "./pages/Error";

// import { useState, useEffect } from "react";
// import { usePosts } from "./hooks/usePosts";
// import { useFetching } from "./hooks/useFetching";
// import { getPageCount } from "./utils/pages";

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

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <HashRouter>
        <Navbar />
        <AppRouter />
      </HashRouter>
    </AuthContext.Provider>
  );
}
