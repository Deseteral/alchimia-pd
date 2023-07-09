--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("BurningStation").extends(Station)
BurningStation.init = function(self, cb)
    BurningStation.super.init(self, cb)
    self.barHeight = 150
    self.cursorHeight = 30
    self.cursorY = 0
    self.targetY = self:randomNextTargetY()
    self.nextTargetY = self:randomNextTargetY()
    self.ticksToNextTarget = 50
    self.progress = 0
end
function BurningStation.randomNextTargetY(self)
    return math.floor(randomRange(nil, 0, self.barHeight))
end
function BurningStation.update(self)
    local cursorSpeed = 2
    local gravity = 1
    local progressSpeed = 0.004
    local progressDrain = progressSpeed / 2
    self.ticksToNextTarget = self.ticksToNextTarget - 1
    if Input:getKey("up") then
        self.cursorY = self.cursorY + cursorSpeed
    end
    self.cursorY = self.cursorY - gravity
    self.cursorY = clamp(nil, self.cursorY, 0, self.barHeight - self.cursorHeight)
    self.targetY = self.targetY + (self.nextTargetY - self.targetY) * 0.1
    if self.targetY >= self.cursorY and self.targetY <= self.cursorY + self.cursorHeight then
        self.progress = self.progress + progressSpeed
    else
        self.progress = self.progress - progressDrain
    end
    self.progress = clamp(nil, self.progress, 0, 1)
    if self.ticksToNextTarget <= 0 then
        self.nextTargetY = self:randomNextTargetY()
        self.ticksToNextTarget = randomRange(nil, 60, 4 * 60)
    end
    if self.progress >= 1 then
        self:onStationCompleteCallback(true, IngredientAction.BURNING)
    end
    if Input:getKeyDown("b") then
        self:onStationCompleteCallback(false, IngredientAction.BURNING)
    end
end
function BurningStation.render(self)
    local x = 140
    local y = 28
    local w = 20
    drawFrame(
        nil,
        x,
        y,
        w * 3,
        self.barHeight,
        function()
            playdate.graphics.drawRect(x, y, w, self.barHeight)
            local drawCursorY = math.floor(y + (self.barHeight - self.cursorY - self.cursorHeight))
            playdate.graphics.fillRect(x, drawCursorY, w, self.cursorHeight)
            local drawTargetY = y + (self.barHeight - self.targetY)
            playdate.graphics.fillRect(x + w + 1, drawTargetY, 5, 1)
            local progressPx = math.floor(self.progress * self.barHeight)
            playdate.graphics.drawRect(
                x + w * 2,
                y,
                math.floor(w / 3),
                self.barHeight
            )
            playdate.graphics.fillRect(
                x + w * 2,
                y + self.barHeight - progressPx,
                math.floor(w / 3),
                progressPx
            )
        end
    )
    local helpWidth = 170
    local helpX = Engine.width - helpWidth - 9 - 2
    drawFrame(
        nil,
        helpX,
        y,
        helpWidth,
        50,
        function()
            Font:draw("Press the up key to move", helpX, y, true)
            Font:draw("burning zone up. Keep", helpX, y + 12, true)
            Font:draw("the cursor in the zone", helpX, y + 12 * 2, true)
            Font:draw("to burn the ingredient.", helpX, y + 12 * 3, true)
        end
    )
end
return ____exports
