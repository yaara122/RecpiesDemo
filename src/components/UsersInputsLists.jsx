import { useEffect, useState } from "react";
import Card from "./UI/Card";
import ListInputItems from "./ListInputItem";
import classes from "./AddRecipeForm.module.css";

const UsersInputsLists = (props) => {
  const { listChange, title, currentList } = props;

  const [inputItemsList, setInputItemsList] = useState(currentList.length === 0 ? [{
      id: Math.random().toString(),
      value: "",
      isTuched: false
    }] 
    : currentList );

  useEffect(() => {
    listChange(inputItemsList);
  }, [inputItemsList, listChange]);

  const deleteItem = (id) => {
    if (! inputItemsList.length < 1) {
      setInputItemsList((prevInputListItem) => {
        return prevInputListItem.filter((item) => item.id !== id);
      });
    }
  };

  const addItem = () => {
    setInputItemsList((prevInputListItem) => {
      let newInputList = [
        ...prevInputListItem,
        { id: Math.random().toString(), value: "" },
      ];
      return newInputList;
    });
  };

  const updateItemValue = (id, value) => {
    setInputItemsList((prevInputListItem) => {
      let newInputList = [...prevInputListItem];
      newInputList.forEach((item) => {
        if (item.id === id) {
          item.value = value;
        }
      });
      return newInputList;
    });
  };

  const toggleIsTuched = (id, isTuched) => {
    setInputItemsList((prevInputListItem) => {
      let newInputList = [...prevInputListItem];
      newInputList.forEach((item) => {
        if (item.id === id) {
          item.isTuched = !isTuched;
        }
      });
      return newInputList;
    });
  };

  return (
    <Card className={classes.input}>
      <h2>{title}</h2>
      {inputItemsList.map((item) => (
        <ListInputItems
          key={item.id}
          deleteItem={deleteItem}
          addItem={addItem}
          updateItemVal={updateItemValue}
          toggleIsTuched={toggleIsTuched}
          item={item}
        />
      ))}
    </Card>
  );
};

export default UsersInputsLists;
