--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("DaySummaryStage").extends(Stage)
DaySummaryStage.init = function(self)
    DaySummaryStage.super.init(self)
end
function DaySummaryStage.onActivate(self)
end
function DaySummaryStage.update(self)
    if Input:getKeyDown("a") then
        Engine:changeStage(WorkshopStage())
    end
end
function DaySummaryStage.render(self)
    local w = 230
    local h = 172
    local x = (Engine.width - w) / 2
    local y = 10
    drawFrame(
        nil,
        x,
        y,
        w,
        h,
        function()
            Font:draw(
                ("Day " .. tostring(Engine.state.day)) .. " completed!",
                x,
                y
            )
            Font:draw(
                ("You have earned " .. tostring(Engine.state.goldLastDay)) .. " gold today",
                x,
                y + 40,
                true
            )
            Font:draw(
                "Total gold: " .. tostring(Engine.state.gold),
                x,
                y + 50 + 15,
                true
            )
            Font:draw(
                "Total orders handled: " .. tostring(Engine.state.completedOrders),
                x,
                y + 50 + 15 * 2,
                true
            )
            if Engine.state.debtPaid then
                Font:draw("You've paid your debt!", x, y + 50 + 15 * 4, true)
            else
                Font:draw(
                    ("You still have to pay " .. tostring(500 - Engine.state.gold)) .. " gold",
                    x,
                    y + 50 + 15 * 4,
                    true
                )
                Font:draw("to pay off the debt", x, y + 50 + 15 * 5, true)
            end
            Font:draw("Press A to continue", x, y + 50 + 15 * 7, true)
        end
    )
end
function DaySummaryStage.onDestroy(self)
end
return ____exports
