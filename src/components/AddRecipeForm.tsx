import { useContext, useRef } from "react";
import classes from "./AddRecipeForm.module.css";
import Error from "./Error";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { RecipeContext } from "../store/RecipeProvider";
import UsersInputsLists from "./UsersInputsLists";
import useRecipes from "../Hooks/use_recipes";

import recipeItem from "../models/recipe";

const AddRecipeForm: React.FC<{ itemInfo: recipeItem }> = (props) => {
  const recipeCtx = useContext(RecipeContext);
  const formRef = useRef<HTMLFormElement>(null);

  const childIngredientsRef = useRef<any>(null);
  const childInstructionsRef = useRef<any>(null);

  const {
    itemData,
    recipeNameChangeHandler,
    ingredientsListChange,
    instructionsListChange,
    changeImg,
    submitHandler,
    errorInfo,
    resetError,
    resetAll: resetForm,
  } = useRecipes(props.itemInfo);

  const updateItem = (item: recipeItem) => {
    recipeCtx.updateItem(item);
  };

  const addItem = (item: recipeItem) => {
    resetForm();
    formRef.current.reset();
    childIngredientsRef.current.resetInputList();
    childInstructionsRef.current.resetInputList();
    recipeCtx.addItem(item);
  };

  const onSubmit = (event: React.SubmitEvent) => {
    let item = submitHandler(event);
    if (item) {
      if (item.isInEditingMood) {
        updateItem(item);
      } else {
        addItem(item);
      }
    }
  };

  return (
    <div>
      {errorInfo && (
        <Error
          onSubmitError={resetError}
          title={errorInfo.title}
          message={errorInfo.message}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={onSubmit} ref={formRef}>
          <h1>recipe name</h1>
          <input
            type="text"
            onChange={recipeNameChangeHandler}
            defaultValue={itemData.title}
          ></input>

          <UsersInputsLists
            title="ingredients"
            listChange={ingredientsListChange}
            currentList={itemData.ingredients}
            ref={childIngredientsRef}
          />
          <UsersInputsLists
            title="instructions"
            listChange={instructionsListChange}
            currentList={itemData.instructions}
            ref={childInstructionsRef}
          />

          <input
            type="file"
            onChange={changeImg}
            placeholder="please enter an image"
            accept="image/*"
          ></input>

          <Button type={"submit"}>add recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipeForm;
