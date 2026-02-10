import React, { useReducer, useEffect } from "react";
import recipeItem from "../models/recipe";

export const RecipeContext = React.createContext<{
  items: recipeItem[];
  addItem: (item: recipeItem) => void;
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
  updateItem: (item: recipeItem) => void;
}>({
  items: [],
  addItem: (item: recipeItem) => {},
  removeItem: (id: string) => {},
  editItem: (id: string) => {},
  updateItem: (item: recipeItem) => {},
});

const recpiesReducer = (state, action) => {
  let updatedItems: recipeItem[];
  switch (action.type) {
    case "ADD":
      updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
      };
    case "REMOVE":
      updatedItems = state.items.filter((x: recipeItem) => {
        return x.id !== action.id;
      });
      return {
        items: updatedItems,
      };
    case "EDIT":
      updatedItems = state.items;
      updatedItems.forEach((item) => {
        if (item.id === action.id) {
          item.isInEditingMood = true;
        }
      });
      return {
        items: updatedItems,
      };
    case "UPDATE":
      updatedItems = state.items;
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.item.id) {
          updatedItems[i] = action.item;
          updatedItems[i].isInEditingMood = false;
        }
      }
      return {
        items: updatedItems,
      };
    default:
      return state;
  }
};

const RecipeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const initialState: { items: recipeItem[] } = {
    items:
      localStorage.getItem("recpies") === null
        ? []
        : JSON.parse(localStorage.getItem("recpies")),
  };

  const [recipesState, dispatchRecipesState] = useReducer(
    recpiesReducer,
    initialState,
  );

  useEffect(() => {
    localStorage.setItem("recpies", JSON.stringify(recipesState.items));
  }, [recipesState]);

  const addRecipeHandler = (item: recipeItem) => {
    dispatchRecipesState({ type: "ADD", item });
  };
  const removeRecipeHandler = (id: string) => {
    dispatchRecipesState({ type: "REMOVE", id: id });
  };

  const editRecpieHandler = (id: string) => {
    dispatchRecipesState({ type: "EDIT", id: id });
  };

  const updateRecpieHandler = (item: recipeItem) => {
    dispatchRecipesState({ type: "UPDATE", item: item });
  };

  const recipeContext = {
    items: recipesState.items,
    addItem: addRecipeHandler,
    removeItem: removeRecipeHandler,
    editItem: editRecpieHandler,
    updateItem: updateRecpieHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
