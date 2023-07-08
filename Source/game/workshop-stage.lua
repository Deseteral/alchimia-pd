--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
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

local function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end
-- End of Lua Library inline imports
local ____exports = {}
class("WorkshopStage").extends(Stage)
WorkshopStage.init = function(self)
    WorkshopStage.super.init(self)
    self.selectedTable = 0
    self.tables = {
        ClientTable(
            function() return self:nextTable() end,
            function() return self:prevTable() end,
            function() return self:openBook() end
        ),
        BrewingTable(
            function() return self:nextTable() end,
            function() return self:prevTable() end,
            function() return self:openBook() end
        )
    }
    self.isInBookView = false
    self.pageNumber = 0
    self.ticksUntilDayOver = 1 * 60 * 60
    self.goldAtTheStartOfTheDay = 0
end
function WorkshopStage.onActivate(self)
    Engine:saveGame()
    local ____Engine_state_0, ____day_1 = Engine.state, "day"
    ____Engine_state_0[____day_1] = ____Engine_state_0[____day_1] + 1
    self.goldAtTheStartOfTheDay = Engine.state.gold
end
function WorkshopStage.update(self)
    if Engine.shouldCountTicks then
        self.ticksUntilDayOver = self.ticksUntilDayOver - 1
    end
    if self.isInBookView then
        self:updateBook()
        return
    end
    local thisFrameSelectedTable = self.selectedTable
    __TS__ArrayForEach(
        self.tables,
        function(____, ____table, idx)
            ____table:update(thisFrameSelectedTable == idx, self.ticksUntilDayOver)
        end
    )
    if self.ticksUntilDayOver == 0 then
        __TS__ArrayUnshift(
            Engine.state.messageBoard.messages,
            dayOverMessage(nil)
        )
    end
    if self.ticksUntilDayOver < 0 and #Engine.state.orders == 0 then
    end
end
function WorkshopStage.render(self)
    self.tables[self.selectedTable + 1]:render()
    if self.isInBookView then
        self:renderBook()
    end
    playdate.graphics.drawRect(0, 0, Engine.width, Engine.height)
end
function WorkshopStage.nextTable(self)
    self.selectedTable = self.selectedTable + 1
    self.selectedTable = clamp(nil, self.selectedTable, 0, 2)
    playSound(nil, Sound.TABLE_MOVE)
end
function WorkshopStage.prevTable(self)
    self.selectedTable = self.selectedTable - 1
    self.selectedTable = clamp(nil, self.selectedTable, 0, 2)
    playSound(nil, Sound.TABLE_MOVE)
end
function WorkshopStage.onDestroy(self)
    Engine.state.messageBoard = {messages = {}}
    Engine.state.orders = {}
    Engine.state.goldLastDay = Engine.state.gold - self.goldAtTheStartOfTheDay
    if not Engine.state.debtPaid and Engine.state.gold >= 500 then
        local ____Engine_state_2, ____gold_3 = Engine.state, "gold"
        ____Engine_state_2[____gold_3] = ____Engine_state_2[____gold_3] - 500
        Engine.state.debtPaid = true
    end
end
function WorkshopStage.updateBook(self)
    if Input:getKeyDown("up") or Input:getKeyDown("b") then
        self:closeBook()
    end
    if Input:getKeyDown("left") then
        self.pageNumber = self.pageNumber - 1
        playSound(nil, Sound.BOOK)
    end
    if Input:getKeyDown("right") then
        self.pageNumber = self.pageNumber + 1
        playSound(nil, Sound.BOOK)
    end
    self.pageNumber = clamp(
        nil,
        self.pageNumber,
        0,
        math.ceil(#Engine.state.recipes / 2) - 1
    )
end
function WorkshopStage.renderBook(self)
    Textures.bookTexture.normal:draw(0, 0)
    local r1 = Engine.state.recipes[self.pageNumber * 2 + 1]
    local r2 = Engine.state.recipes[self.pageNumber * 2 + 1 + 1]
    if r1 ~= nil then
        drawRecipe(nil, r1, 60, 20)
        Font:draw(
            tostring(self.pageNumber * 2 + 1),
            50,
            200
        )
    end
    if r2 ~= nil then
        drawRecipe(nil, r2, 225, 20)
        Font:draw(
            __TS__StringPadStart(
                tostring(self.pageNumber * 2 + 2),
                2,
                " "
            ),
            340,
            200
        )
    end
end
function WorkshopStage.openBook(self)
    Engine.shouldCountTicks = false
    self.isInBookView = true
    playSound(nil, Sound.TABLE_MOVE)
end
function WorkshopStage.closeBook(self)
    Engine.shouldCountTicks = true
    self.isInBookView = false
    playSound(nil, Sound.TABLE_MOVE)
end
return ____exports
