import { type } from "@testing-library/user-event/dist/type";
import { useReducer, useEffect, useState } from "react";

const emptyItem = {
  title: "",
  id: "",
  ingredients: [],
  instructions: [],
  img: "",
  isInEdettingMood: false,
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
    case "INGREDIENTS_LIST_ADD": {
      const newIngredientsList = state.ingredients;
      newIngredientsList.push(action.listItem);
      return {
        ...state,
        ingredients: newIngredientsList,
      };
    }
    case "INSTRUCTIONS_LIST_ADD": {
      let newInstructionsList = state.instructions;
      newInstructionsList.push(action.listItem);
      return {
        ...state,
        instructions: newInstructionsList,
      };
    }
    case "CHANGE_IMG": {
      return {
        ...state,
        img: action.img,
      };
    }
    case "RESET_INSTRUCTIONS_LIST": {
      return {
        ...state,
        instructions: [],
      };
    }
    case "RESET_INGREDIENTS_LIST": {
      return {
        ...state,
        ingredients: [],
      };
    }
    case "RESET_Item": {
      return emptyItem;
    }
  }
};

const useRecipes = (item) => {
  const [itemState, dispatchState] = useReducer(itemStateReducer, item);

  const [errorInput, setErrorInput] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    message: "",
    title: "",
  });

  const recipeNameChangeHandler = (event) => {
    dispatchState({
      type: "CHANGE_TITLE",
      title: event.target.value,
    });
  };

  const adddIngredientsList = (item) => {
    dispatchState({
      type: "INGREDIENTS_LIST_ADD",
      listItem: item,
    });
  };

  const adddInstructionsList = (item) => {
    dispatchState({
      type: "INSTRUCTIONS_LIST_ADD",
      listItem: item,
    });
  };

  const changeImg = (event) => {
    if (event.target.files[0].type === "image/jpeg") {
      dispatchState({
        type: "CHANGE_IMG",
        img: URL.createObjectURL(event.target.files[0]),
      });
    }
    else {
      setErrorInput(true);
      setErrorInfo({
        message: "please enter an img",
        title: "wrong input",
      });
      return;
    }
  };

  const resetError = () => {
    setErrorInput(false);
  };

  const resetIngredientsList = () => {
    dispatchState({
      type: "RESET_INGREDIENTS_LIST",
    });
  };

  const resetInstructionsList = () => {
    dispatchState({
      type: "RESET_INSTRUCTIONS_LIST",
    });
  };

  const resetAll = () => {
    console.log("in reset form from use")
    resetIngredientsList()
    resetInstructionsList()
    dispatchState({
      type: "RESET_Item",
    });
    console.log(itemState)
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      itemState.ingredients.length === 0 ||
      itemState.instructions.length === 0
    ) {
      setErrorInput(true);
      setErrorInfo({
        message: "please enter ingredients and instructions",
        title: "missing input",
      });
      return;
    } else if (itemState.title === "") {
      setErrorInput(true);
      setErrorInfo({
        message: "please enter a name for the recipe ",
        title: "missing input",
      });
      return;
    }
    else if (itemState.img === ""){
        setErrorInput(true);
        setErrorInfo({
        message: "please enter an img ",
        title: "missing input img",
      });
      return;
    }
    return itemState;
  };

  return {
    itemData: itemState,
    recipeNameChangeHandler,
    adddIngredientsList,
    adddInstructionsList,
    resetIngredientsList,
    resetInstructionsList,
    changeImg,
    submitHandler,
    errorInput,
    errorInfo,
    resetError,
    resetAll
  };
};

export default useRecipes;
