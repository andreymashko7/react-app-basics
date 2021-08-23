import { useContext } from "react";
import { AuthContext } from "../context";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "./../components/UI/button/MyButton";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <div>
      <h1>Page for login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="enter your name" />
        <MyInput type="password" placeholder="enter your password" />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;
