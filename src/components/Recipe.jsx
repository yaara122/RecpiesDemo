import { useContext } from "react";
import RecipeContext from "../store/recipe-cortext";
import Button from "./UI/Button";

const Recipe = (props) => {
  const recipeCtx = useContext(RecipeContext);
  return (
    <li key={props.recipe.id}>
      <h2>{props.recipe.title}</h2>

      <label>ingredients:</label>
      {props.recipe.ingredients.map((ingredient) => (
        <div key={ingredient.id}>{ingredient.value}</div>
      ))}

      <label>instructions:</label>
      {props.recipe.instructions.map((instruction) => (
        <div key={instruction.id}>
          <p>{instruction.value}</p>
        </div>
      ))}
      
      <img src={props.recipe.img} alt="recipe" />
      <Button
        onClick={() => {
          recipeCtx.removeItem(props.recipe.id);
        }}
      >
        delete
      </Button>
      <Button
        onClick={() => {
          recipeCtx.editItem(props.recipe.id);
        }}
      >
        edit
      </Button>
    </li>
  );
};

export default Recipe;
