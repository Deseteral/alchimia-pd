--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("Table").extends(Object)
Table.init = function(self, onNextTableCb, onPreviousTableCb, openBook)
    Table.super.init(self, onNextTableCb, onPreviousTableCb, openBook)
    self.onNextTableCb = onNextTableCb
    self.onPreviousTableCb = onPreviousTableCb
    self.openBook = openBook
end
return ____exports
