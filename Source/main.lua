import "CoreLibs/object"
import "how-to-play-stage"
import "main-menu-stage"
import "story-stage"
import "engine/engine"
import "engine/font"
import "engine/frame"
import "engine/input"
import "engine/sounds"
import "engine/stage"
import "engine/textures"
import "game/game-state"
import "game/ingredients"
import "game/message-board"
import "game/potion-names"
import "game/recipe-logic"
import "game/recipes"
import "game/utils"

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {};
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
