--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
class("MainMenuStage").extends(Stage)
MainMenuStage.init = function(self)
    MainMenuStage.super.init(self)
    self.cursor = 0
    self.hasSaveData = Engine:hasSavedData()
end
function MainMenuStage.onActivate(self)
end
function MainMenuStage.update(self)
    if Input:getKeyDown("up") then
        self.cursor = self.cursor - 1
        playSound(nil, Sound.MENU_PICK)
    end
    if Input:getKeyDown("down") then
        self.cursor = self.cursor + 1
        playSound(nil, Sound.MENU_PICK)
    end
    self.cursor = clamp(nil, self.cursor, 0, self.hasSaveData and 2 or 1)
    if Input:getKeyDown("a") then
        if self.cursor == 0 then
            Engine:newGame()
            Engine:changeStage(StoryStage())
        elseif self.hasSaveData and self.cursor == 1 then
            Engine:loadGame()
            Engine:changeStage(WorkshopStage())
        elseif self.hasSaveData and self.cursor == 2 or not self.hasSaveData and self.cursor == 1 then
            Engine:changeStage(HowToPlayStage())
        end
        playSound(nil, Sound.MENU_CONFIRM)
    end
end
function MainMenuStage.render(self)
    playdate.graphics.drawRect(0, 0, Engine.width, Engine.height)
    Textures.menuLogoTexture.normal:draw(0, 0)
    local w = 132
    local h = 82
    local x = (Engine.width - w) / 2
    local y = 90
    drawFrame(
        nil,
        x,
        y,
        w,
        h,
        function()
            local mx = x + 16 + 2
            Textures.listPointerRightTexture.normal:draw(x, y + 2 + 30 * self.cursor)
            Font:draw("New game", mx, y)
            if self.hasSaveData then
                Font:draw("Continue", mx, y + 30)
                Font:draw("How to play", mx, y + 30 * 2)
            else
                Font:draw("How to play", mx, y + 30)
            end
        end
    )
end
function MainMenuStage.onDestroy(self)
end
return ____exports
