import { useState } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import classes from "./AddRecipeForm.module.css";

const UsersInputsLists = (props) => {
  console.log(props)
  const [inputItemString, setInputItemString] = useState("");

  const addItemToList = () => {
    if (inputItemString === "") {
      return;
    }
    props.onChangeInputList({
      text: inputItemString,
      id: Math.random().toString(),
    });
    setInputItemString("");
  };

  const inputTextChangeHandler = (event) => {
    setInputItemString(event.target.value);
  };

  return (
    <Card className={classes.input}>
      <h2>{props.title}</h2>

      <input
        type="text"
        value={inputItemString}
        onChange={inputTextChangeHandler}
      ></input>

      <Button
        type="button"
        onClick={addItemToList}
      >{`add ${props.title}`}</Button>

      <ul>
        {props.currentList.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>

      <Button type="button" onClick={props.onDeleteList}>
        reset list
      </Button>
    </Card>
  );
};

export default UsersInputsLists;
