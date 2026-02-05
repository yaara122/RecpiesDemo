import { useContext, useRef } from "react";
import classes from "./AddRecipeForm.module.css";
import Error from "./Error";
import Button from "./UI/Button";
import Card from "./UI/Card";
import RecipeContext from "../store/recipe-cortext";
import UsersInputsLists from "./UsersInputsLists";
import useRecipes from "../Hooks/use_recipes";

const AddRecipeForm = (props) => {
  const recipeCtx = useContext(RecipeContext);
  const formRef = useRef();
  const childIngredientsRef = useRef();
  const childInstructionsRef = useRef();

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

  const updateItem = (item) => {
    recipeCtx.updateItem(item);
  };

  const addItem = (item) => {
    resetForm();
    formRef.current.reset();
    childIngredientsRef.current.resetInputList();
    childInstructionsRef.current.resetInputList();
    recipeCtx.addItem(item);
  };

  const onSubmit = (event) => {
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
