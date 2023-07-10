--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayPushArray(self, items)
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__CountVarargs(...)
    return select("#", ...)
end

local function __TS__ArraySplice(self, ...)
    local args = {...}
    local len = #self
    local actualArgumentCount = __TS__CountVarargs(...)
    local start = args[1]
    local deleteCount = args[2]
    if start < 0 then
        start = len + start
        if start < 0 then
            start = 0
        end
    elseif start > len then
        start = len
    end
    local itemCount = actualArgumentCount - 2
    if itemCount < 0 then
        itemCount = 0
    end
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - start
    else
        actualDeleteCount = deleteCount or 0
        if actualDeleteCount < 0 then
            actualDeleteCount = 0
        end
        if actualDeleteCount > len - start then
            actualDeleteCount = len - start
        end
    end
    local out = {}
    for k = 1, actualDeleteCount do
        local from = start + k
        if self[from] ~= nil then
            out[k] = self[from]
        end
    end
    if itemCount < actualDeleteCount then
        for k = start + 1, len - actualDeleteCount do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
        for k = len - actualDeleteCount + itemCount + 1, len do
            self[k] = nil
        end
    elseif itemCount > actualDeleteCount then
        for k = len - actualDeleteCount, start + 1, -1 do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
    end
    local j = start + 1
    for i = 3, actualArgumentCount do
        self[j] = args[i]
        j = j + 1
    end
    for k = #self, len - actualDeleteCount + itemCount + 1, -1 do
        self[k] = nil
    end
    return out
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
end

local function __TS__ArrayFindIndex(self, callbackFn, thisArg)
    for i = 1, #self do
        if callbackFn(thisArg, self[i], i - 1, self) then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArrayUnshift(self, ...)
    local items = {...}
    local numItemsToInsert = #items
    if numItemsToInsert == 0 then
        return #self
    end
    for i = #self, 1, -1 do
        self[i + numItemsToInsert] = self[i]
    end
    for i = 1, numItemsToInsert do
        self[i] = items[i]
    end
    return #self
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end
-- End of Lua Library inline imports
local ____exports = {}
class("BrewingTable").extends(Table)
BrewingTable.init = function(self, onNextTableCb, onPreviousTableCb, openBook)
    BrewingTable.super.init(self, onNextTableCb, onPreviousTableCb, openBook)
    self.showList = false
    self.ingredientCursor = 0
    self.selectedIngredientCursor = 0
    self.selectedIngredients = {}
    self.leftColumn = true
    self.ticksUntilBrewingDone = 0
    self.makingRecipe = nil
    self.bubbleParticles = {}
    self.stopBubbleSoundCallback = nil
end
function BrewingTable.update(self, isSelected)
    self.ticksUntilBrewingDone = self.ticksUntilBrewingDone - 1
    if self.showList and isSelected then
        if Input:getKeyDown("up") then
            if self.leftColumn then
                self.ingredientCursor = self.ingredientCursor - 1
            else
                self.selectedIngredientCursor = self.selectedIngredientCursor - 1
            end
            playSound(nil, Sound.MENU_PICK)
        elseif Input:getKeyDown("down") then
            if self.leftColumn then
                self.ingredientCursor = self.ingredientCursor + 1
            else
                self.selectedIngredientCursor = self.selectedIngredientCursor + 1
            end
            playSound(nil, Sound.MENU_PICK)
        end
        if Input:getKeyDown("left") and #Engine.state.preparedIngredients > 0 then
            self.leftColumn = true
            playSound(nil, Sound.MENU_PICK)
        elseif Input:getKeyDown("right") and #self.selectedIngredients > 0 then
            self.selectedIngredientCursor = #self.selectedIngredients
            self.leftColumn = false
            playSound(nil, Sound.MENU_PICK)
        end
        if Input:getKeyDown("b") then
            __TS__ArrayPushArray(Engine.state.preparedIngredients, self.selectedIngredients)
            self:resetListState()
            self.showList = false
        end
        if Input:getKeyDown("a") then
            if self.leftColumn then
                if #Engine.state.preparedIngredients > 0 then
                    local ing = table.unpack(__TS__ArraySplice(Engine.state.preparedIngredients, self.ingredientCursor, 1))
                    local ____self_selectedIngredients_0 = self.selectedIngredients
                    ____self_selectedIngredients_0[#____self_selectedIngredients_0 + 1] = ing
                    self.ingredientCursor = self.ingredientCursor - 1
                    if #Engine.state.preparedIngredients == 0 then
                        self.selectedIngredientCursor = #self.selectedIngredients
                        self.leftColumn = false
                    end
                end
            else
                if self.selectedIngredientCursor == #self.selectedIngredients then
                    local recipe = findMatchingRecipe(nil, self.selectedIngredients, Engine.state.recipes)
                    self.makingRecipe = recipe
                    self.ticksUntilBrewingDone = randomRange(nil, 3 * 60, 7 * 60)
                    if not self.stopBubbleSoundCallback then
                        self.stopBubbleSoundCallback = playSound(nil, Sound.BUBBLES, true)
                    end
                    if recipe then
                        print("making recipe", recipe)
                    else
                        print("recipe does not exist")
                    end
                    self:resetListState()
                    self.showList = false
                else
                    local ing = table.unpack(__TS__ArraySplice(self.selectedIngredients, self.selectedIngredientCursor, 1))
                    local ____Engine_state_preparedIngredients_1 = Engine.state.preparedIngredients
                    ____Engine_state_preparedIngredients_1[#____Engine_state_preparedIngredients_1 + 1] = ing
                    self.selectedIngredientCursor = self.selectedIngredientCursor - 1
                    if #self.selectedIngredients == 0 then
                        self.leftColumn = true
                    end
                end
            end
            playSound(nil, Sound.MENU_CONFIRM)
        end
        self.ingredientCursor = clamp(nil, self.ingredientCursor, 0, #Engine.state.preparedIngredients - 1)
        self.selectedIngredientCursor = clamp(nil, self.selectedIngredientCursor, 0, #self.selectedIngredients)
        return
    end
    if isSelected then
        if Input:getKeyDown("left") then
            self:onPreviousTableCb()
        elseif Input:getKeyDown("a") and self.ticksUntilBrewingDone < 0 then
            self:resetListState()
            self.showList = true
        elseif Input:getKeyDown("down") then
            self:openBook()
        end
    end
    if self.ticksUntilBrewingDone > 0 then
        local ____self_bubbleParticles_2 = self.bubbleParticles
        ____self_bubbleParticles_2[#____self_bubbleParticles_2 + 1] = {
            x = randomRange(nil, 267, 360),
            y = randomRange(nil, 70, 110),
            velocity = 0,
            isSmall = math.random() > 0.5,
            offset = randomRange(nil, 0, 1000)
        }
    end
    do
        local i = 0
        while i < #self.bubbleParticles do
            local ____self_bubbleParticles_index_3, ____velocity_4 = self.bubbleParticles[i + 1], "velocity"
            ____self_bubbleParticles_index_3[____velocity_4] = ____self_bubbleParticles_index_3[____velocity_4] + 0.01
            local ____self_bubbleParticles_index_5, ____y_6 = self.bubbleParticles[i + 1], "y"
            ____self_bubbleParticles_index_5[____y_6] = ____self_bubbleParticles_index_5[____y_6] - self.bubbleParticles[i + 1].velocity
            i = i + 1
        end
    end
    self.bubbleParticles = __TS__ArrayFilter(
        self.bubbleParticles,
        function(____, b) return b.y > -10 end
    )
    if self.ticksUntilBrewingDone == 0 then
        if self.makingRecipe then
            local recipeInOrdersIdx = __TS__ArrayFindIndex(
                Engine.state.orders,
                function(____, r)
                    local ____r_name_9 = r.name
                    local ____opt_7 = self.makingRecipe
                    return ____r_name_9 == (____opt_7 and ____opt_7.name)
                end
            )
            if recipeInOrdersIdx >= 0 then
                __TS__ArraySplice(Engine.state.orders, recipeInOrdersIdx, 1)
                local ____Engine_state_10, ____completedOrders_11 = Engine.state, "completedOrders"
                ____Engine_state_10[____completedOrders_11] = ____Engine_state_10[____completedOrders_11] + 1
                local ____Engine_state_12, ____gold_13 = Engine.state, "gold"
                ____Engine_state_12[____gold_13] = ____Engine_state_12[____gold_13] + #self.makingRecipe.ingredients
                __TS__ArrayUnshift(
                    Engine.state.messageBoard.messages,
                    orderCompleteMessage(nil, self.makingRecipe)
                )
                __TS__ArrayUnshift(
                    Engine.state.messageBoard.messages,
                    clientGoodbyeMessasge(nil)
                )
                playSound(nil, Sound.GOOD_POTION)
                print("completed order " .. tostring(recipeInOrdersIdx))
            else
                __TS__ArrayUnshift(
                    Engine.state.messageBoard.messages,
                    recipeWithoutOrderMessage(nil)
                )
                playSound(nil, Sound.BAD_POTION)
                print("made potion but nobody ordered it", self.makingRecipe)
            end
            self.makingRecipe = nil
        else
            __TS__ArrayUnshift(
                Engine.state.messageBoard.messages,
                recipeDoesNotExistMessage(nil)
            )
            playSound(nil, Sound.BAD_POTION)
            print("made potion that does not exist")
        end
        if self.stopBubbleSoundCallback then
            self:stopBubbleSoundCallback()
            self.stopBubbleSoundCallback = nil
        end
    end
end
function BrewingTable.render(self)
    Textures.tableTexture.normal:draw(0, 0)
    Textures.cauldronTexture.normal:draw(260, 80)
    if self.showList then
        local listWidth = 80
        local maxCountOnPage = 9
        drawFrame(
            nil,
            11,
            11,
            listWidth,
            218,
            function()
                Font:draw("Storage", 12, 8)
                if #Engine.state.preparedIngredients == 0 then
                    return
                end
                local page = math.floor(self.ingredientCursor / maxCountOnPage)
                local startIdx = page * maxCountOnPage
                do
                    local idx = startIdx
                    while idx < math.min(startIdx + 9, #Engine.state.preparedIngredients) do
                        local pi = Engine.state.preparedIngredients[idx + 1]
                        local yy = 11 + Font.charHeight + idx % maxCountOnPage * (16 + 4)
                        if idx == self.ingredientCursor and self.leftColumn then
                            Textures.listPointerRightTexture.normal:draw(11, yy)
                        end
                        drawPreparedIngredientRow(nil, pi, 11 + 16 + 4, yy)
                        idx = idx + 1
                    end
                end
            end
        )
        local rightColumnX = 11 + listWidth + 20
        drawFrame(
            nil,
            rightColumnX,
            11,
            listWidth,
            218,
            function()
                Font:draw("Selected", rightColumnX + 1, 8)
                local page = math.floor(self.selectedIngredientCursor / maxCountOnPage)
                local startIdx = page * maxCountOnPage
                local pageCount = math.ceil((#self.selectedIngredients + 1) / maxCountOnPage)
                do
                    local idx = startIdx
                    while idx < math.min(startIdx + 9, #self.selectedIngredients) do
                        local pi = self.selectedIngredients[idx + 1]
                        local yy = 11 + Font.charHeight + idx % maxCountOnPage * (16 + 4)
                        if idx == self.selectedIngredientCursor and not self.leftColumn then
                            Textures.listPointerRightTexture.normal:draw(rightColumnX, yy)
                        end
                        drawPreparedIngredientRow(nil, pi, rightColumnX + 16 + 4, yy)
                        idx = idx + 1
                    end
                end
                if #self.selectedIngredients > 0 and page == pageCount - 1 then
                    local yy = 11 + Font.charHeight + #self.selectedIngredients % maxCountOnPage * (16 + 4)
                    if self.selectedIngredientCursor == #self.selectedIngredients and not self.leftColumn then
                        Textures.listPointerRightTexture.normal:draw(rightColumnX, yy + 1)
                    end
                    Font:draw("Brew!", rightColumnX + 16 + 4, yy)
                end
            end
        )
    end
    __TS__ArrayForEach(
        self.bubbleParticles,
        function(____, bubble)
            local t = bubble.isSmall and Textures.bubbleSmallTexture or Textures.bubbleLargeTexture
            t.normal:draw(
                bubble.x + math.floor(math.sin((Engine.ticks + bubble.offset) / 25) * 3),
                bubble.y
            )
        end
    )
end
function BrewingTable.resetListState(self)
    self.ingredientCursor = 0
    self.selectedIngredientCursor = 0
    self.leftColumn = true
    self.selectedIngredients = {}
end
return ____exports
