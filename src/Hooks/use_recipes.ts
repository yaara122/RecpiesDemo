import { useCallback, useState } from "react";
import recipeItem from "../models/recipe";
import inputListItem from "../models/inputListItem";

const useRecipes = (item?: recipeItem) => {

  const [recipe, setRecipe] = useState<recipeItem>(
    item ? item : new recipeItem(),
  );
  const [errorInfo, setErrorInfo] = useState<{
    title: string;
    message: string;
  }>();

  const recipeNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecipe((previtem) => {
      previtem.title = event.target.value;
      return previtem;
    });
  };

  const ingredientsListChange = useCallback((itemList:inputListItem[] ) => {
    setRecipe((previtem) => {
      const newItem = previtem;
      newItem.ingredients = itemList;
      return newItem;
    });
  }, []);

  const instructionsListChange = useCallback((itemList:inputListItem[]) => {
    setRecipe((previtem) => {
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
      setRecipe((previtem) => {
        const newItem = previtem;
        newItem.img = URL.createObjectURL(event.target.files[0]);
        return newItem;
      });
    } else {
      setRecipe((previtem) => {
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
    setRecipe(new recipeItem());
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      (recipe.ingredients.length === 1 &&
        recipe.ingredients[0].value.trim() === "") ||
      (recipe.instructions.length === 1 &&
        recipe.instructions[0].value.trim() === "")
    ) {
      setErrorInfo({
        message: "please enter ingredients and instructions",
        title: "missing input",
      });
      return;
    }
    if (recipe.title === "") {
      setErrorInfo({
        message: "please enter a name for the recipe ",
        title: "missing input",
      });
      return;
    }
    if (recipe.img === "") {
      setErrorInfo({
        message: "please enter an image ",
        title: "missing image input",
      });
      return;
    }
    return recipe;
  };

  return {
    itemData: recipe,
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
