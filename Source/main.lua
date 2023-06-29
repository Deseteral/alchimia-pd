--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        ____moduleCache[file] = { value = (select("#", ...) > 0) and module(...) or module(file) }
        return ____moduleCache[file].value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["engine.stage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
import("CoreLibs/object")
class("Stage").extends(Object)
Stage.init = function(self)
    Stage.super.init(self)
end
____exports.Stage = Stage
return ____exports
 end,
["main-menu-stage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____stage = require("engine.stage")
local Stage = ____stage.Stage
import("CoreLibs/object")
class("MainMenuStage").extends(Stage)
MainMenuStage.init = function(self)
    MainMenuStage.super.init(self)
end
function MainMenuStage.onActivate(self)
    print("onActivate")
end
function MainMenuStage.update(self)
    print("update")
end
function MainMenuStage.render(self)
    print("render")
end
function MainMenuStage.onDestroy(self)
    print("onDestroy")
end
____exports.MainMenuStage = MainMenuStage
return ____exports
 end,
["engine.engine"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
import("CoreLibs/object")
class("Engine").extends(Object)
Engine.init = function(self)
    Engine.super.init(self)
end
function Engine.changeStage(self, nextStage)
    local ____opt_0 = self.activeStage
    if ____opt_0 ~= nil then
        ____opt_0:onDestroy()
    end
    self.activeStage = nextStage
    self.activeStage:onActivate()
end
Engine.activeStage = nil
Engine.width = 400
Engine.height = 240
Engine.primaryColor = playdate.graphics.kColorBlack
Engine.secondaryColor = playdate.graphics.kColorWhite
Engine.ticks = 0
Engine.shouldCountTicks = true
____exports.Engine = Engine
return ____exports
 end,
["engine.input"] = function(...) 
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
____exports.Input = Input
return ____exports
 end,
["main"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____engine = require("engine.engine")
local Engine = ____engine.Engine
local ____main_2Dmenu_2Dstage = require("main-menu-stage")
local MainMenuStage = ____main_2Dmenu_2Dstage.MainMenuStage
import("CoreLibs/object");
(function(self)
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
 end,
}
return require("main", ...)
