import React, { useEffect, useState } from "react";
import recipeItem from "../models/recipe";

type recipeContextObject = {
  items: recipeItem[];
  addItem: (item: recipeItem) => void;
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
  updateItem: (item: recipeItem) => void;
};

const RecipeContext = React.createContext<recipeContextObject>({
  items: [],
  addItem: (item: recipeItem) => {},
  removeItem: (id: string) => {},
  editItem: (id: string) => {},
  updateItem: (item: recipeItem) => {},
});

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const initialState: { items: recipeItem[] } = {
    items:
      localStorage.getItem("recpies") === null
        ? []
        : JSON.parse(localStorage.getItem("recpies")),
  };

  const [recipesState, setRecipesState] = useState(initialState);

  let updatedItems: recipeItem[];

  useEffect(() => {
    localStorage.setItem("recpies", JSON.stringify(recipesState.items));
  }, [recipesState]);

  const addRecipeHandler = (item: recipeItem) => {
    setRecipesState((prevRecipe) => {
      return { ...prevRecipe, items: [...prevRecipe.items, item] };
    });
  };

  const removeRecipeHandler = (id: string) => {
    setRecipesState((prevRecipe) => {
      updatedItems = prevRecipe.items.filter((x: recipeItem) => {
        return x.id !== id;
      });
      return { ...prevRecipe, items: updatedItems };
    });
  };

  const editRecpieHandler = (id: string) => {
    setRecipesState((prevRecipe) => {
      updatedItems = prevRecipe.items;
      updatedItems.forEach((item) => {
        if (item.id === id) {
          item.isInEditingMood = true;
        }
      });
      return { ...prevRecipe, items: updatedItems };
    });
  };

  const updateRecpieHandler = (item: recipeItem) => {
    setRecipesState((prevRecipe) => {
      updatedItems = prevRecipe.items;
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === item.id) {
          updatedItems[i] = item;
          updatedItems[i].isInEditingMood = false;
        }
      }
      return { ...prevRecipe, items: updatedItems };
    });
  };

  const recipeContext: recipeContextObject = {
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

export default RecipeContext;
