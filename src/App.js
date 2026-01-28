import logo from "./logo.svg";
import "./App.css";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipesList from "./components/RecipesList";
import RecipeProvider from "./store/RecipeProvider";

let initialItem = {
  title: "",
  id: "",
  ingredients: [],
  instructions: [],
  img: "",
  isInEdettingMood: false,
  id: Math.random().toString(),
};

function App() {


  return (
    <RecipeProvider>
      <AddRecipeForm
        itemInfo={initialItem}
      ></AddRecipeForm>
      <RecipesList></RecipesList>
    </RecipeProvider>
  );
}

export default App;
