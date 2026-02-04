import { useCallback, useReducer, useState } from "react";

const emptyItem = {
  title: "",
  ingredients: [],
  instructions: [],
  img: "",
  isInEditingMood: false,
  id: Math.random().toString(),
};

const itemStateReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TITLE": {
      return {
        ...state,
        title: action.title,
      };
    }
    case "INGREDIENTS_LIST_CHANGE": {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case "INSTRUCTIONS_LIST_CHANGE": {
      return {
        ...state,
        instructions: action.instructions,
      };
    }
    case "CHANGE_IMG": {
      return {
        ...state,
        img: action.img,
      };
    }
    case "RESET_ITEM": {
      return emptyItem;
    }
    default:
      return emptyItem;
  }
};

const useRecipes = (item) => {
  const [itemState, dispatchState] = useReducer(
    itemStateReducer,
    item ? item : emptyItem,
  );
  const [errorInfo, setErrorInfo] = useState();

  const recipeNameChangeHandler = (event) => {
    dispatchState({
      type: "CHANGE_TITLE",
      title: event.target.value,
    });
  };

  const ingredientsListChange = useCallback(
    (itemList) => {
      dispatchState({
        type: "INGREDIENTS_LIST_CHANGE",
        ingredients: itemList,
      });
    },
    [dispatchState],
  );

  const instructionsListChange = useCallback(
    (itemList) => {
      dispatchState({
        type: "INSTRUCTIONS_LIST_CHANGE",
        instructions: itemList,
      });
    },
    [dispatchState],
  );

  const changeImg = (event) => {
    if (
      event.target.files[0] &&
      event.target.files[0].type.startsWith("image/")
    ) {
      dispatchState({
        type: "CHANGE_IMG",
        img: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      dispatchState({
        type: "CHANGE_IMG",
        img: "",
      });
      return;
    }
  };

  const resetError = () => {
    setErrorInfo(null);
  };

  const resetAll = () => {
    dispatchState({
      type: "RESET_ITEM",
    });
  };

  const submitHandler = (event) => {
    // work on img handeling
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
