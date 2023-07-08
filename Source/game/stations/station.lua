--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("Station").extends(Object)
Station.init = function(self, cb)
    Station.super.init(self, cb)
    self.onStationCompleteCallback = cb
end
return ____exports
