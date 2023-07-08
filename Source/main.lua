--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
import("prelude");
(function(self)
    Textures:loadTextures()
    local initialStage = MainMenuStage()
    Engine:changeStage(initialStage)
end)(nil)
playdate.update = function()
    playdate.graphics.clear(Engine.secondaryColor)
    playdate.graphics.setColor(Engine.primaryColor)
    local stage = Engine.activeStage
    stage:update()
    stage:render()
    if Engine.shouldCountTicks then
        Engine.ticks = Engine.ticks + 1
    end
end
return ____exports
