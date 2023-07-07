--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.Ingredient = Ingredient or ({})
____exports.Ingredient.HERB = 0
____exports.Ingredient[____exports.Ingredient.HERB] = "HERB"
____exports.Ingredient.MUSHROOM = 1
____exports.Ingredient[____exports.Ingredient.MUSHROOM] = "MUSHROOM"
____exports.Ingredient.STONE = 2
____exports.Ingredient[____exports.Ingredient.STONE] = "STONE"
____exports.Ingredient.GOLD = 3
____exports.Ingredient[____exports.Ingredient.GOLD] = "GOLD"
____exports.Ingredient.FLOWER = 4
____exports.Ingredient[____exports.Ingredient.FLOWER] = "FLOWER"
____exports.Ingredients = {
    ____exports.Ingredient.HERB,
    ____exports.Ingredient.MUSHROOM,
    ____exports.Ingredient.STONE,
    ____exports.Ingredient.GOLD,
    ____exports.Ingredient.FLOWER
}
____exports.IngredientAction = IngredientAction or ({})
____exports.IngredientAction.CUTTING = 0
____exports.IngredientAction[____exports.IngredientAction.CUTTING] = "CUTTING"
____exports.IngredientAction.GRIDING = 1
____exports.IngredientAction[____exports.IngredientAction.GRIDING] = "GRIDING"
____exports.IngredientAction.BURNING = 2
____exports.IngredientAction[____exports.IngredientAction.BURNING] = "BURNING"
____exports.IngredientAction.ENCHANTING = 3
____exports.IngredientAction[____exports.IngredientAction.ENCHANTING] = "ENCHANTING"
____exports.IngredientActions = {____exports.IngredientAction.CUTTING, ____exports.IngredientAction.GRIDING, ____exports.IngredientAction.BURNING, ____exports.IngredientAction.ENCHANTING}
function ____exports.ingredientDisplayName(self, ingredient)
    repeat
        local ____switch3 = ingredient
        local ____cond3 = ____switch3 == ____exports.Ingredient.HERB
        if ____cond3 then
            return "Herb"
        end
        ____cond3 = ____cond3 or ____switch3 == ____exports.Ingredient.MUSHROOM
        if ____cond3 then
            return "Mushroom"
        end
        ____cond3 = ____cond3 or ____switch3 == ____exports.Ingredient.STONE
        if ____cond3 then
            return "Stone"
        end
        ____cond3 = ____cond3 or ____switch3 == ____exports.Ingredient.GOLD
        if ____cond3 then
            return "Gold"
        end
        ____cond3 = ____cond3 or ____switch3 == ____exports.Ingredient.FLOWER
        if ____cond3 then
            return "Flower"
        end
        do
            return "bleh"
        end
    until true
end
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredient = ____exports.Ingredient
Ingredients = ____exports.Ingredients
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientAction = ____exports.IngredientAction
IngredientActions = ____exports.IngredientActions
ingredientDisplayName = ____exports.ingredientDisplayName
return ____exports