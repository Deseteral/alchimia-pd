--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end
-- End of Lua Library inline imports
local ____exports = {}
class("IngredientsTable").extends(Table)
IngredientsTable.init = function(self, onNextTableCb, onPreviousTableCb, openBook)
    IngredientsTable.super.init(self, onNextTableCb, onPreviousTableCb, openBook)
    self.selectedStation = 0
    self.activeStation = nil
    self.isIndredientPickerOpen = false
    self.ingredientCursor = 0
    self.ignoringInputTicks = 0
end
function IngredientsTable.update(self, isSelected)
    if self.activeStation and isSelected then
        self.activeStation:update()
        return
    end
    self.ignoringInputTicks = self.ignoringInputTicks - 1
    if not self.isIndredientPickerOpen and Input:getKeyDown("a") and self:canUseInput(isSelected) then
        self.isIndredientPickerOpen = true
        playSound(nil, Sound.MENU_CONFIRM)
        return
    end
    if self.isIndredientPickerOpen and isSelected then
        if Input:getKeyDown("up") then
            self.ingredientCursor = self.ingredientCursor - 1
            playSound(nil, Sound.MENU_PICK)
        end
        if Input:getKeyDown("down") then
            self.ingredientCursor = self.ingredientCursor + 1
            playSound(nil, Sound.MENU_PICK)
        end
        if Input:getKeyDown("b") then
            self.isIndredientPickerOpen = false
            self.ingredientCursor = 0
            return
        end
        self.ingredientCursor = clamp(nil, self.ingredientCursor, 0, 5 - 1)
        if Input:getKeyDown("a") then
            local selectedIngredient = Ingredients[self.ingredientCursor + 1]
            self.ingredientCursor = 0
            self.isIndredientPickerOpen = false
            local function cb(____, success, action)
                if success then
                    local amount = randomRange(nil, 1, 2)
                    do
                        local a = 0
                        while a < amount do
                            local ____Engine_state_preparedIngredients_0 = Engine.state.preparedIngredients
                            ____Engine_state_preparedIngredients_0[#____Engine_state_preparedIngredients_0 + 1] = {ingredient = selectedIngredient, action = action}
                            a = a + 1
                        end
                    end
                    playSound(nil, Sound.GOOD_POTION)
                    print("preparing ingredient successful, receiving " .. tostring(amount))
                end
                self:exitStation()
            end
            if self.selectedStation == 0 then
                self.activeStation = CuttingStation(cb)
            elseif self.selectedStation == 1 then
            elseif self.selectedStation == 2 then
                self.activeStation = BurningStation(cb)
            elseif self.selectedStation == 3 then
            end
            Engine.shouldCountTicks = false
            playSound(nil, Sound.MENU_CONFIRM)
        end
        return
    end
    local prevSlectedStation = self.selectedStation
    if Input:getKeyDown("right") and self:canUseInput(isSelected) then
        self.selectedStation = self.selectedStation + 1
    end
    if Input:getKeyDown("left") and self:canUseInput(isSelected) then
        self.selectedStation = self.selectedStation - 1
    end
    if self.selectedStation < 0 then
        self:onPreviousTableCb()
    elseif self.selectedStation > 3 then
        self:onNextTableCb()
    elseif Input:getKeyDown("down") and self:canUseInput(isSelected) then
        self:openBook()
    end
    self.selectedStation = clamp(nil, self.selectedStation, 0, 3)
    if self.selectedStation ~= prevSlectedStation then
        playSound(nil, Sound.MENU_PICK)
    end
end
function IngredientsTable.render(self)
    Textures.tableTexture.normal:draw(0, 0)
    self:drawStation(Textures.cuttingTexture, 10, 40, self.selectedStation == 0)
    self:drawStation(Textures.grindingTexture, 106, 93, self.selectedStation == 1)
    self:drawStation(Textures.burningTexture, 193, 25, self.selectedStation == 2)
    self:drawStation(Textures.enchantingTexture, 305, 100, self.selectedStation == 3)
    if self.isIndredientPickerOpen then
        drawFrame(
            nil,
            11,
            11,
            120,
            97,
            function()
                __TS__ArrayForEach(
                    Ingredients,
                    function(____, ing, idx)
                        local xx = 11
                        local yy = 6 + idx * Font.charHeight
                        if idx == self.ingredientCursor then
                            Textures.listPointerRightTexture.normal:draw(xx, yy + 5)
                        end
                        getIngredientIcon(nil, ing):draw(xx + 16, yy + 5)
                        Font:draw(
                            ingredientDisplayName(nil, ing),
                            xx + 16 + 16 + 2,
                            yy + 3
                        )
                    end
                )
            end
        )
    end
    if self.activeStation then
        self.activeStation:render()
    end
end
function IngredientsTable.drawStation(self, texture, x, y, isSelected)
    local frameOffset = 4
    if isSelected then
        playdate.graphics.drawRect(x - frameOffset, y - frameOffset, texture.normal.width + frameOffset * 2, texture.normal.height + frameOffset * 2)
    end
    texture.normal:draw(x, y)
end
function IngredientsTable.exitStation(self)
    self.activeStation = nil
    self.ignoringInputTicks = math.floor(0.5 * 60)
    Engine.shouldCountTicks = true
end
function IngredientsTable.canUseInput(self, isSelected)
    return self.ignoringInputTicks <= 0 and isSelected
end
return ____exports
