--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local keyMap = {
    up = playdate.kButtonUp,
    down = playdate.kButtonDown,
    left = playdate.kButtonLeft,
    right = playdate.kButtonRight,
    a = playdate.kButtonA,
    b = playdate.kButtonB
}
class("Input").extends(Object)
Input.init = function(self)
    Input.super.init(self)
end
function Input.getKey(self, key)
    return playdate.buttonIsPressed(keyMap[key])
end
function Input.getKeyDown(self, key)
    return playdate.buttonJustPressed(keyMap[key])
end
return ____exports
