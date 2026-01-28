import classes from "./RecipesList.module.css";
import Card from "./UI/Card";
import Button from "./UI/Button";
import RecipeContext from "../store/recipe-cortext";
import AddRecipeForm from "./AddRecipeForm";
import { useContext } from "react";

const RecipesList = (props) => {
  const recipeCtx = useContext(RecipeContext);
  console.log(recipeCtx.items)
  return (
    <Card className={classes.recipes}>
      <ul>
        {recipeCtx.items.map((recipe) =>

          recipe.isInEdettingMood ? (
            <AddRecipeForm itemInfo={recipe} applyItemFunction={props.applyItemFunction}></AddRecipeForm>
          ) : (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>

              <label>ingredients:</label>

              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <p>{ingredient.text}</p>
                </div>
              ))}

              <label>instructions:</label>

              {recipe.instructions.map((instruction) => (
                <div key={instruction.id}>
                  <p>{instruction.text}</p>
                </div>
              ))}

              <img src={recipe.img} />
              <Button
                onClick={() => {
                  recipeCtx.removeItem(recipe.id);
                }}
              >
                delete
              </Button>
                <div></div>

                <Button
                onClick={() => {
                  recipeCtx.editItem(recipe.id);
                }}
              >
                edit
              </Button>

            </li>
          ),
        )}
      </ul>
    </Card>
  );
};

export default RecipesList;

