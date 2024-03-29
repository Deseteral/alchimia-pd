--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
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
function Engine.saveGame(self)
    playdate.datastore.write(Engine.state, "data", true)
end
function Engine.hasSavedData(self)
    local data = playdate.datastore.read()
    return data ~= nil
end
function Engine.loadGame(self)
    local data = playdate.datastore.read()
    Engine.state = data
end
function Engine.newGame(self)
    Engine.state = {
        preparedIngredients = {},
        recipes = generateRecipes(nil),
        orders = {},
        gold = 0,
        completedOrders = 0,
        messageBoard = {messages = {}},
        day = 0,
        goldLastDay = 0,
        debtPaid = false
    }
end
Engine.activeStage = nil
Engine.width = 400
Engine.height = 240
Engine.primaryColor = playdate.graphics.kColorBlack
Engine.secondaryColor = playdate.graphics.kColorWhite
Engine.ticks = 0
Engine.shouldCountTicks = true
return ____exports
