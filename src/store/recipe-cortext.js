import React from "react";

const RecipeContext = React.createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {},
    editItem: (id) => {},
    updateItem: (item) => {}
});

export default RecipeContext;