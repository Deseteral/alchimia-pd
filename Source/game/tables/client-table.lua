--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
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

local function __TS__ArrayReverse(self)
    local i = 1
    local j = #self
    while i < j do
        local temp = self[j]
        self[j] = self[i]
        self[i] = temp
        i = i + 1
        j = j - 1
    end
    return self
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end
-- End of Lua Library inline imports
local ____exports = {}
class("ClientTable").extends(Table)
ClientTable.init = function(self, onNextTableCb, onPreviousTableCb, openBook)
    ClientTable.super.init(self, onNextTableCb, onPreviousTableCb, openBook)
    self.nextClientAtTicks = Engine.ticks + 10 * 60
end
function ClientTable.update(self, isSelected, ticksUntilDayOver)
    if Engine.ticks >= self.nextClientAtTicks and ticksUntilDayOver >= 0 then
        local recipeRange = Engine.state.completedOrders <= 3 and 5 or #Engine.state.recipes - 1
        local recipeIdx = randomRange(nil, 0, recipeRange)
        local recipe = Engine.state.recipes[recipeIdx + 1]
        local ____Engine_state_orders_0 = Engine.state.orders
        ____Engine_state_orders_0[#____Engine_state_orders_0 + 1] = recipe
        self.nextClientAtTicks = Engine.ticks + 60 * 10
        __TS__ArrayUnshift(
            Engine.state.messageBoard.messages,
            newClientMessage(nil, recipe)
        )
        playSound(nil, Sound.NEW_CLIENT)
        print("new client with order", recipe)
    end
    if Input:getKeyDown("right") and isSelected then
        self:onNextTableCb()
    end
    if Input:getKeyDown("down") and isSelected then
        self:openBook()
    end
end
function ClientTable.render(self)
    drawFrame(
        nil,
        11,
        11,
        100,
        218,
        function()
            Font:draw("Orders", 12, 8)
            do
                local idx = 0
                while idx < #Engine.state.orders do
                    local orderRecipe = Engine.state.orders[idx + 1]
                    local yy = 8 + Font.charHeight + 10 + idx * (Font.charHeight + 4)
                    Font:draw("-" .. orderRecipe.name, 11, yy)
                    idx = idx + 1
                end
            end
        end
    )
    local infoFrameX = 11 + 118
    drawFrame(
        nil,
        infoFrameX,
        11,
        260,
        16,
        function()
            local dayMessage = "Day " .. tostring(Engine.state.day)
            Font:draw(dayMessage, infoFrameX, 7)
            local secondsUnitlNextClient = 10 - math.floor((self.nextClientAtTicks - Engine.ticks) / 60 + 0.5)
            do
                local tidx = 0
                while tidx < 10 do
                    local size = 5
                    local xx = infoFrameX + Font:lineLengthPx(dayMessage, false) + 5 + tidx * (size + 2)
                    local yy = 16
                    if tidx < secondsUnitlNextClient then
                        playdate.graphics.fillRect(xx, yy, size, size)
                    else
                        playdate.graphics.drawRect(xx, yy, size, size)
                    end
                    tidx = tidx + 1
                end
            end
            Textures.coinTexture.normal:draw(300, 11)
            Font:draw(
                tostring(Engine.state.gold),
                300 + 16 + 2,
                7
            )
        end
    )
    local messageFrameWidth = 260
    drawFrame(
        nil,
        11 + 118,
        11 + 34,
        messageFrameWidth,
        184,
        function()
            local line = 0
            __TS__ArrayForEach(
                Engine.state.messageBoard.messages,
                function(____, message, msgIdx)
                    local basexx = 11 + 118
                    __TS__ArrayForEach(
                        __TS__ArrayReverse({table.unpack(message.text)}),
                        function(____, txt)
                            local xx = message.rightSide and basexx + messageFrameWidth - Font:lineLengthPx(txt, true) or basexx
                            local yy = 215 - line * Font.charHeightSmall - msgIdx * 7
                            Font:draw(txt, xx, yy, true)
                            line = line + 1
                        end
                    )
                end
            )
        end
    )
end
return ____exports
