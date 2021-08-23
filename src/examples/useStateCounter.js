import "./App.css";
import { useState } from "react";
import ClassCounter from "./components/Counter";

export default function App() {
  const [likes, setLikes] = useState(0);
  const [value, setValue] = useState("");

  const decrement = () => {
    setLikes(likes + 1);
  };

  const increment = () => {
    setLikes(likes - 1);
  };

  const inputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <h1>{likes}</h1>

      <p>{value}</p>
      <input type="text" value={value} onChange={inputChange} />
      <button type="button" onClick={increment}>
        -
      </button>
      <button type="button" onClick={decrement}>
        +
      </button>

      <ClassCounter />
    </>
  );
}
