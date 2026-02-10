import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Card from "./UI/Card";
import ListInputItems from "./ListInputItem";
import classes from "./AddRecipeForm.module.css";
import inputListItem from "../models/inputListItem";

const UsersInputsLists = forwardRef(
  (
    props: {
      listChange: (inputItemsList: inputListItem[]) => void;
      title: string;
      currentList: inputListItem[];
    },
    ref: undefined,
  ) => {
    const DEFAULT_INPUT_ITEMS_LIST = [
      {
        id: Math.random().toString(),
        value: "",
        isTuched: false,
      },
    ];

    const { listChange, title, currentList } = props;
    const [inputItemsList, setInputItemsList] = useState<inputListItem[]>(
      currentList.length === 0 ? DEFAULT_INPUT_ITEMS_LIST : currentList,
    );

    useEffect(() => {
      listChange(inputItemsList);
    }, [inputItemsList, listChange]);

    const deleteItem = (id: string) => {
      if (!(inputItemsList.length < 1)) {
        setInputItemsList((prevInputListItem) => {
          return prevInputListItem.filter((item) => item.id !== id);
        });
      }
    };

    const addItem = () => {
      const newInputItem = new inputListItem();
      setInputItemsList((prevInputListItem) => {
        return prevInputListItem.concat(newInputItem);
      });
    };

    const updateItemValue = (id: string, value: string) => {
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

    const toggleIsTuched = (id: string, isTuched: Boolean) => {
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

    const resetInputList = () => {
      setInputItemsList(DEFAULT_INPUT_ITEMS_LIST);
    };

    useImperativeHandle(ref, () => ({ resetInputList }));

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
  },
);

export default UsersInputsLists;
