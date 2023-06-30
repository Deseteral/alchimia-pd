enum Ingredient {
  HERB,
  MUSHROOM,
  STONE,
  GOLD,
  FLOWER,
}

const Ingredients = [
  Ingredient.HERB,
  Ingredient.MUSHROOM,
  Ingredient.STONE,
  Ingredient.GOLD,
  Ingredient.FLOWER,
];

enum IngredientAction {
  CUTTING,
  GRIDING,
  BURNING,
  ENCHANTING,
}

const IngredientActions = [
  IngredientAction.CUTTING,
  IngredientAction.GRIDING,
  IngredientAction.BURNING,
  IngredientAction.ENCHANTING,
];

interface PreparedIngredient {
  ingredient: Ingredient,
  action: IngredientAction,
}

function ingredientDisplayName(ingredient: Ingredient): string {
  switch (ingredient) {
    case Ingredient.HERB: return 'Herb';
    case Ingredient.MUSHROOM: return 'Mushroom';
    case Ingredient.STONE: return 'Stone';
    case Ingredient.GOLD: return 'Gold';
    case Ingredient.FLOWER: return 'Flower';
    default: return 'bleh';
  }
}

export {
  Ingredient,
  Ingredients,
  IngredientAction,
  IngredientActions,
  PreparedIngredient,
  ingredientDisplayName,
};
