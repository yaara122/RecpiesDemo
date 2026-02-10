import { useCallback, useState } from "react";
import recipeItem from "../models/recipe";
import inputListItem from "../models/inputListItem";

const useRecipes = (item?: recipeItem) => {
  // const emptyItem = {
  //   title: "",
  //   ingredients: [],
  //   instructions: [],
  //   img: "",
  //   // isInEditingMood: false,
  //   // id: Math.random().toString(),
  // };

  const [itemState, setItemsState] = useState<recipeItem>(
    item ? item : new recipeItem(),
  );
  const [errorInfo, setErrorInfo] = useState<{
    title: string;
    message: string;
  }>();

  const recipeNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemsState((previtem) => {
      const newItem = previtem;
      newItem.title = event.target.value;
      return newItem;
    });
  };

  const ingredientsListChange = useCallback((itemList:inputListItem[] ) => {
    setItemsState((previtem) => {
      const newItem = previtem;
      newItem.ingredients = itemList;
      return newItem;
    });
  }, []);

  const instructionsListChange = useCallback((itemList:inputListItem[]) => {
    setItemsState((previtem) => {
      const newItem = previtem;
      newItem.instructions = itemList;
      return newItem;
    });
  }, []);

  const changeImg = (event) => {
    if (
      event.target.files[0] &&
      event.target.files[0].type.startsWith("image/")
    ) {
      setItemsState((previtem) => {
        const newItem = previtem;
        newItem.img = URL.createObjectURL(event.target.files[0]);
        return newItem;
      });
    } else {
      setItemsState((previtem) => {
        const newItem = previtem;
        newItem.img = "";
        return newItem;
      });
    }
  };

  const resetError = () => {
    setErrorInfo(null);
  };

  const resetAll = () => {
    // setItemsState(emptyItem);
    setItemsState(new recipeItem());
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      (itemState.ingredients.length === 1 &&
        itemState.ingredients[0].value === "") ||
      (itemState.instructions.length === 1 &&
        itemState.instructions[0].value === "")
    ) {
      setErrorInfo({
        message: "please enter ingredients and instructions",
        title: "missing input",
      });
      return;
    }
    if (itemState.title === "") {
      setErrorInfo({
        message: "please enter a name for the recipe ",
        title: "missing input",
      });
      return;
    }
    if (itemState.img === "") {
      setErrorInfo({
        message: "please enter an image ",
        title: "missing image input",
      });
      return;
    }
    return itemState;
  };

  return {
    itemData: itemState,
    recipeNameChangeHandler,
    ingredientsListChange,
    instructionsListChange,
    changeImg,
    submitHandler,
    errorInfo,
    resetError,
    resetAll,
  };
};

export default useRecipes;
