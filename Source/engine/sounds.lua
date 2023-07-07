--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.Sound = Sound or ({})
____exports.Sound.MENU_PICK = "menu_pick"
____exports.Sound.MENU_CONFIRM = "menu_confirm"
____exports.Sound.BOOK = "book"
____exports.Sound.NEW_CLIENT = "new_client"
____exports.Sound.TABLE_MOVE = "table_move"
____exports.Sound.BUBBLES = "bubbles"
____exports.Sound.GOOD_POTION = "good_potion"
____exports.Sound.BAD_POTION = "bad_potion"
____exports.Sound.KNIFE = "knife"
____exports.Sound.SPELL = "spell"
____exports.Sound.SPELL_BAD = "spell_bad"
function ____exports.playSound(self, sound, loop)
    if loop == nil then
        loop = false
    end
    local audio = playdate.sound.sampleplayer.new("sounds/" .. string.lower(sound))
    local repeatCount = loop and 0 or 1
    audio:play(repeatCount)
    return function() return audio:stop() end
end
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
Sound = ____exports.Sound
playSound = ____exports.playSound
return ____exports