--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
end
-- End of Lua Library inline imports
local ____exports = {}
class("EnchantmentStation").extends(Station)
EnchantmentStation.init = function(self, cb)
    EnchantmentStation.super.init(self, cb)
    self.noteSize = 32
    self.hitLineX = 30 + math.floor(self.noteSize / 2)
    self.noteSpeed = 3
    self.notes = {}
    self.ticksToNextNote = 0
    self.progress = 0
end
function EnchantmentStation.update(self)
    self.ticksToNextNote = self.ticksToNextNote - 1
    do
        local idx = 0
        while idx < #self.notes do
            local ____self_notes_index_0, ____pos_1 = self.notes[idx + 1], "pos"
            ____self_notes_index_0[____pos_1] = ____self_notes_index_0[____pos_1] - self.noteSpeed
            idx = idx + 1
        end
    end
    __TS__ArrayForEach(
        {"up", "right", "down", "left"},
        function(____, kp, ki)
            if Input:getKeyDown(kp) then
                local noteWasHit = false
                do
                    local idx = 0
                    while idx < #self.notes do
                        do
                            local note = self.notes[idx + 1]
                            if note.dir ~= ki then
                                goto __continue7
                            end
                            if self.hitLineX >= note.pos and self.hitLineX <= note.pos + self.noteSize then
                                self.notes[idx + 1].hit = true
                                self.notes[idx + 1].counted = true
                                noteWasHit = true
                                self.progress = self.progress + 0.1
                                playSound(nil, Sound.SPELL)
                            end
                        end
                        ::__continue7::
                        idx = idx + 1
                    end
                end
                if not noteWasHit then
                    self.progress = self.progress - 0.1
                    playSound(nil, Sound.SPELL_BAD)
                end
            end
        end
    )
    do
        local idx = 0
        while idx < #self.notes do
            local note = self.notes[idx + 1]
            if note.pos + self.noteSize + 5 < self.hitLineX - 10 and not note.hit and not note.counted then
                self.progress = self.progress - 0.1
                note.counted = true
            end
            idx = idx + 1
        end
    end
    self.progress = clamp(nil, self.progress, 0, 1)
    if self.ticksToNextNote <= 0 then
        local ____self_notes_2 = self.notes
        ____self_notes_2[#____self_notes_2 + 1] = {
            dir = randomRange(nil, 0, 3),
            pos = Engine.width + self.noteSize,
            hit = false,
            counted = false
        }
        self.ticksToNextNote = randomRange(nil, 30, 80)
    end
    self.notes = __TS__ArrayFilter(
        self.notes,
        function(____, note) return note.pos > -self.noteSize or not note.counted end
    )
    if self.progress >= 1 then
        self:onStationCompleteCallback(true, IngredientAction.ENCHANTING)
    end
    if Input:getKeyDown("b") then
        self:onStationCompleteCallback(false, IngredientAction.ENCHANTING)
    end
end
function EnchantmentStation.render(self)
    local noteBarX = self.hitLineX - math.floor(self.noteSize / 2)
    local noteBarY = 15
    local clearHeight = noteBarY + 4 * (self.noteSize + 5)
    playdate.graphics.setColor(Engine.secondaryColor)
    playdate.graphics.fillRect(0, 0, Engine.width, clearHeight)
    playdate.graphics.setColor(Engine.primaryColor)
    playdate.graphics.fillRect(0, clearHeight, Engine.width, 1)
    local progressBarY = 5
    local progressBarHeight = 5
    playdate.graphics.drawRect(5, progressBarY, 100, progressBarHeight)
    playdate.graphics.fillRect(
        5,
        progressBarY,
        math.floor(100 * self.progress),
        progressBarHeight
    )
    local hitLineY = progressBarY + progressBarHeight + 1
    playdate.graphics.fillRect(self.hitLineX, hitLineY, 1, clearHeight - hitLineY - 1)
    __TS__ArrayForEach(
        self.notes,
        function(____, note)
            if note.hit then
                return
            end
            local nx = math.floor(note.pos)
            local ny = noteBarY + note.dir * (self.noteSize + 5)
            if note.dir == 0 then
                Textures.enchantingKeyUpTexture.inverted:draw(nx, ny)
            elseif note.dir == 1 then
                Textures.enchantingKeyRightTexture.inverted:draw(nx, ny)
            elseif note.dir == 2 then
                Textures.enchantingKeyDownTexture.inverted:draw(nx, ny)
            elseif note.dir == 3 then
                Textures.enchantingKeyLeftTexture.inverted:draw(nx, ny)
            end
        end
    )
    Textures.enchantingKeyUpTexture.normal:draw(noteBarX, noteBarY + 0 * (self.noteSize + 5))
    Textures.enchantingKeyRightTexture.normal:draw(noteBarX, noteBarY + 1 * (self.noteSize + 5))
    Textures.enchantingKeyDownTexture.normal:draw(noteBarX, noteBarY + 2 * (self.noteSize + 5))
    Textures.enchantingKeyLeftTexture.normal:draw(noteBarX, noteBarY + 3 * (self.noteSize + 5))
    local helpWidth = 270
    local helpX = 9 + 2
    local helpY = 180
    drawFrame(
        nil,
        helpX,
        helpY,
        helpWidth,
        26,
        function()
            Font:draw("Press the proper key when it's passing", helpX, helpY, true)
            Font:draw("the line to enchant the ingredient", helpX, helpY + 12, true)
        end
    )
end
return ____exports
