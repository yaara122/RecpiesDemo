import inputListtem from "./inputListItem";

class recipeItem {
  title: string;
  ingredients: inputListtem[];
  instructions: inputListtem[];
  img: string;
  isInEditingMood: boolean;
  id: string;

  constructor(
  ) {
    this.title = "";
    this.ingredients = [];
    this.instructions = [];
    this.img = "";
    this.isInEditingMood = false;
    this.id = Math.random().toString();
  }
}

export default recipeItem;
