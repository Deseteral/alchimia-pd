--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end
-- End of Lua Library inline imports
local ____exports = {}
class("HowToPlayStage").extends(Stage)
HowToPlayStage.init = function(self)
    HowToPlayStage.super.init(self)
    self.lines = {
        "Use directional buttons to move",
        "B to go back, A to confirm/activate",
        "",
        "Every 10 seconds new customer comes in",
        "Press down to pull the recipe book and search for",
        "the recipe for potion that they want",
        "",
        "Use the tools on the middle table to prepare ingredients",
        "Then put those in the cauldron on the right most table",
        "",
        "",
        "",
        "Created in 48 hours for Ludum Dare 51",
        "",
        "Press B to go back"
    }
end
function HowToPlayStage.onActivate(self)
end
function HowToPlayStage.update(self)
    if Input:getKeyDown("b") then
        Engine:changeStage(MainMenuStage())
        playSound(nil, Sound.MENU_CONFIRM)
    end
end
function HowToPlayStage.render(self)
    playdate.graphics.drawRect(0, 0, Engine.width, Engine.height)
    __TS__ArrayForEach(
        self.lines,
        function(____, line, idx)
            Font:draw(line, 3, idx * 15, true)
        end
    )
end
function HowToPlayStage.onDestroy(self)
end
return ____exports
