import { useReducer, useEffect } from "react";
import RecipeContext from "./recipe-cortext";


const recpiesReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  } else if (action.type === "REMOVE") {
    let updatedItems = state.items.filter((x) => {
      return x.id !== action.id;
    });
    return {
      items: updatedItems,
    };
  } else if (action.type === "EDIT") {
    let updatedItems = state.items;
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].id === action.id) {
        updatedItems[i].isInEdettingMood = true;
      }
    }
    return {
      items: updatedItems,
    };
  }
  else if (action.type === "UPDATE") {
    let updatedItems = state.items;
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].id === action.item.id) {
        updatedItems[i] = action.item;
        updatedItems[i].isInEdettingMood = false;
      }
    }
    return {
      items: updatedItems,
    };
  }
  return null;
};

const RecipeProvider = (props) => {

const initialState = {
    items:
      localStorage.getItem("recpies") === null
        ? []
        : JSON.parse(localStorage.getItem("recpies"))
  };

  const [recipesState, dispatchRecipesState] = useReducer(
    recpiesReducer,
    initialState
  );
 
  useEffect(() => {
    localStorage.setItem('recpies', JSON.stringify(recipesState.items))
  }, [recipesState])



  const addRecipeHandler = (item) => {
    dispatchRecipesState({ type: "ADD", item: item });
  };
  const removeRecipeHandler = (id) => {
    dispatchRecipesState({ type: "REMOVE", id: id });
  };

  const editRecpieHandler = (id) => {
    dispatchRecipesState({ type: "EDIT", id: id });
  }

  const updateRecpieHandler = (item) => {
    dispatchRecipesState({ type: "UPDATE", item: item });
  }

  const recipeContext = {
    items: recipesState.items,
    addItem: addRecipeHandler,
    removeItem: removeRecipeHandler,
    editItem: editRecpieHandler,
    updateItem: updateRecpieHandler
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
