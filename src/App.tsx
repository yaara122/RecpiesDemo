import {RecipeProvider} from "./store/RecipeProvider";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipesList from "./components/RecipesList";

const App = () => {
  return (
    <RecipeProvider>
      <AddRecipeForm itemInfo={null} />
      <RecipesList />
    </RecipeProvider>
  );
};

export default App;
