import { PreparedIngredient } from 'src/game/ingredients';
import { Recipe } from 'src/game/recipes';

function preparedIngredientEquals(pi1: PreparedIngredient, pi2: PreparedIngredient): boolean {
  return ((pi1.ingredient === pi2.ingredient) && (pi1.action === pi2.action));
}

function doesListContainPreparedIngredient(pi: PreparedIngredient, pl: PreparedIngredient[]): boolean {
  return (pl.findIndex((pii) => preparedIngredientEquals(pi, pii))) >= 0;
}

function preparedIngredientListEquals(pl1: PreparedIngredient[], pl2: PreparedIngredient[]): boolean {
  if (pl1.length !== pl2.length) return false;

  const c1: boolean = pl1.every((pi1) => doesListContainPreparedIngredient(pi1, pl2));
  const c2: boolean = pl2.every((pi2) => doesListContainPreparedIngredient(pi2, pl1));

  return (c1 && c2);
}

function findMatchingRecipe(pl: PreparedIngredient[], list: Recipe[]): (Recipe | null) {
  return list.find((r) => preparedIngredientListEquals(r.ingredients, pl)) || null;
}

export {
  preparedIngredientEquals,
  doesListContainPreparedIngredient,
  preparedIngredientListEquals,
  findMatchingRecipe,
};
