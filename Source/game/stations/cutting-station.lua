--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("CuttingStation").extends(Station)
CuttingStation.init = function(self, cb)
    CuttingStation.super.init(self, cb)
    self.progress = 0
    self.left = true
end
function CuttingStation.update(self)
    if Input:getKeyDown("left") and self.left then
        self.left = false
        self.progress = self.progress + 0.01
        playSound(nil, Sound.KNIFE)
    end
    if Input:getKeyDown("right") and not self.left then
        self.left = true
        self.progress = self.progress + 0.05
        playSound(nil, Sound.KNIFE)
    end
    self.progress = self.progress - 0.002
    self.progress = clamp(nil, self.progress, 0, 1)
    if self.progress >= 1 then
        self:onStationCompleteCallback(true, IngredientAction.CUTTING)
    end
    if Input:getKeyDown("b") then
        self:onStationCompleteCallback(false, IngredientAction.CUTTING)
    end
end
function CuttingStation.render(self)
    local xx = 100
    local yy = 15
    drawFrame(
        nil,
        xx,
        yy,
        100,
        55,
        function()
            playdate.graphics.drawRect(xx, yy, 100, 5)
            playdate.graphics.fillRect(
                xx,
                yy,
                math.floor(100 * self.progress),
                5
            )
            local kxx = xx + 17
            if self.left then
                Textures.enchantingKeyLeftTexture.normal:draw(kxx, 30)
                Textures.enchantingKeyRightTexture.inverted:draw(kxx + 35, 30)
            else
                Textures.enchantingKeyLeftTexture.inverted:draw(kxx, 30)
                Textures.enchantingKeyRightTexture.normal:draw(kxx + 35, 30)
            end
        end
    )
    local helpWidth = 170
    local helpX = Engine.width - helpWidth - 9 - 2
    drawFrame(
        nil,
        helpX,
        yy,
        helpWidth,
        26,
        function()
            Font:draw("Press left and right key", helpX, yy, true)
            Font:draw("alternately to cut", helpX, yy + 12, true)
        end
    )
end
return ____exports
