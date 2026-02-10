import { useContext } from "react";
import classes from "./RecipesList.module.css";
import Card from "./UI/Card";
import {RecipeContext} from '../store/RecipeProvider'
import AddRecipeForm from "./AddRecipeForm";
import Recipe from "./Recipe";

const RecipesList: React.FC<{}> = () => {
  const recipeCtx = useContext(RecipeContext);
  return (
    <Card className={classes.recipes}>
      <ul>
        {recipeCtx.items.map((recipe) =>
          recipe.isInEditingMood ? (
            <AddRecipeForm key={recipe.id} itemInfo={recipe}></AddRecipeForm>
          ) : (
            <Recipe key={recipe.id} recipe={recipe}/>
          ),
        )}
      </ul>
    </Card>
  );
};

export default RecipesList;
