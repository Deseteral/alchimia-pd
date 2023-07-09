--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("GrindingStation").extends(Station)
GrindingStation.init = function(self, cb)
    GrindingStation.super.init(self, cb)
    self.positionX = 150
    self.positionY = 80
    self.radius = self.positionY - 5
    self.targets = {
        0,
        45,
        90,
        135,
        180
    }
    self.previousTargetHit = -1
    self.progress = 0
    self.progressDrawRadius = 0
end
function GrindingStation.update(self)
    local deg = playdate.getCrankPosition()
    local value = math.abs(math.floor(deg))
    local targetHit = false
    local offsetDeg = 5
    do
        local idx = 0
        while idx < #self.targets do
            do
                local target = self.targets[idx + 1]
                if target == self.previousTargetHit then
                    goto __continue4
                end
                targetHit = value >= target - offsetDeg and value <= target + offsetDeg
                if targetHit then
                    self.previousTargetHit = target
                    break
                end
            end
            ::__continue4::
            idx = idx + 1
        end
    end
    if targetHit then
        local firstElement = table.remove(self.targets, 1)
        local ____self_targets_0 = self.targets
        ____self_targets_0[#____self_targets_0 + 1] = firstElement
        self.progress = self.progress + 0.03
        playSound(nil, Sound.KNIFE)
    end
    if self.progress >= 1 then
        self:onStationCompleteCallback(true, IngredientAction.GRIDING)
    end
    if Input:getKeyDown("b") then
        self:onStationCompleteCallback(false, IngredientAction.GRIDING)
    end
end
function GrindingStation.render(self)
    local xx = self.positionX - 70
    local yy = self.positionY - 70
    drawFrame(
        nil,
        xx,
        yy,
        140,
        140,
        function()
            Textures.circleTexture.inverted:draw(xx, yy)
            Textures.circleTexture.normal:draw(xx, yy)
            self.progressDrawRadius = self.progressDrawRadius + (self.progress * (self.radius - 3) - self.progressDrawRadius) * 0.1
            playdate.graphics.fillCircleInRect(self.positionX - self.progressDrawRadius, self.positionY - self.progressDrawRadius, self.progressDrawRadius * 2, self.progressDrawRadius * 2)
        end
    )
    local helpWidth = 150
    local helpX = Engine.width - helpWidth - 9 - 2
    drawFrame(
        nil,
        helpX,
        yy,
        helpWidth,
        39,
        function()
            Font:draw("Move the mouse cursor", helpX, yy, true)
            Font:draw("around the circle to", helpX, yy + 12, true)
            Font:draw("grind the ingredient", helpX, yy + 12 * 2, true)
        end
    )
end
return ____exports
