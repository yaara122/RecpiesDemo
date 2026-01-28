import { useContext, useState } from "react";
import classes from "./AddRecipeForm.module.css";
import Error from "./Error";
import Button from "./UI/Button";
import Card from "./UI/Card";
import RecipeContext from "../store/recipe-cortext";
import UsersInputsLists from "./UsersInputsLists";
import useRecipes from "../Hooks/use_recipes";

const AddRecipeForm = (props) => {
  const recipeCtx = useContext(RecipeContext);

  const {
    itemData,
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
    resetAll: resetForm,
  } = useRecipes(props.itemInfo);


  const updateItem = (item) => {
    recipeCtx.updateItem(item);
  };

  const addItem = (item) => {
    let form = document.getElementById("recipe-form");
    form.reset();
    resetForm();
    //find a way to reset inputLists
    
    recipeCtx.addItem(item);
  };

  const onSubmit = (event) => {
    let item = submitHandler(event);
    if (item) {
      if (item.isInEdettingMood) {
        updateItem(item);
      } else if (!item.isInEdettingMood) {
        addItem(item);
      }
    }
  };

  return (
    <div>
      {errorInput && (
        <Error
          onSubmitError={resetError}
          title={errorInfo.title}
          message={errorInfo.message}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={onSubmit} id="recipe-form">
          <h1>recipe name</h1>
          <input
            type="text"
            onChange={recipeNameChangeHandler}
            value={itemData.title}
          ></input>

          <UsersInputsLists
            title={"ingredients"}
            onChangeInputList={adddIngredientsList}
            onDeleteList={resetIngredientsList}
            currentList={itemData.ingredients}
          ></UsersInputsLists>

          <UsersInputsLists
            title={"instructions"}
            onChangeInputList={adddInstructionsList}
            onDeleteList={resetInstructionsList}
            currentList={itemData.instructions}
          ></UsersInputsLists>

          <input
            type="file"
            onChange={changeImg}
            accept="image/png, image/jpeg"
          ></input>

          <Button type={"submit"}>add recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipeForm;
