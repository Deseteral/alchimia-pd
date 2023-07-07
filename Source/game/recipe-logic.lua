--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayFindIndex(self, callbackFn, thisArg)
    for i = 1, #self do
        if callbackFn(thisArg, self[i], i - 1, self) then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArrayEvery(self, callbackfn, thisArg)
    for i = 1, #self do
        if not callbackfn(thisArg, self[i], i - 1, self) then
            return false
        end
    end
    return true
end

local function __TS__ArrayFind(self, predicate, thisArg)
    for i = 1, #self do
        local elem = self[i]
        if predicate(thisArg, elem, i - 1, self) then
            return elem
        end
    end
    return nil
end
-- End of Lua Library inline imports
local ____exports = {}
function ____exports.preparedIngredientEquals(self, pi1, pi2)
    return pi1.ingredient == pi2.ingredient and pi1.action == pi2.action
end
function ____exports.doesListContainPreparedIngredient(self, pi, pl)
    return __TS__ArrayFindIndex(
        pl,
        function(____, pii) return ____exports.preparedIngredientEquals(nil, pi, pii) end
    ) >= 0
end
function ____exports.preparedIngredientListEquals(self, pl1, pl2)
    if #pl1 ~= #pl2 then
        return false
    end
    local c1 = __TS__ArrayEvery(
        pl1,
        function(____, pi1) return ____exports.doesListContainPreparedIngredient(nil, pi1, pl2) end
    )
    local c2 = __TS__ArrayEvery(
        pl2,
        function(____, pi2) return ____exports.doesListContainPreparedIngredient(nil, pi2, pl1) end
    )
    return c1 and c2
end
function ____exports.findMatchingRecipe(self, pl, list)
    return __TS__ArrayFind(
        list,
        function(____, r) return ____exports.preparedIngredientListEquals(nil, r.ingredients, pl) end
    ) or nil
end
preparedIngredientEquals = ____exports.preparedIngredientEquals
doesListContainPreparedIngredient = ____exports.doesListContainPreparedIngredient
preparedIngredientListEquals = ____exports.preparedIngredientListEquals
findMatchingRecipe = ____exports.findMatchingRecipe
return ____exports