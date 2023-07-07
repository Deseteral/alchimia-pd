--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local tableUrl = "table"
local burningUrl = "burning"
local cuttingUrl = "cutting"
local enchantingUrl = "enchanting"
local grindingUrl = "grinding"
local enchantingKeyUpUrl = "enchanting_keyup"
local enchantingKeyRightUrl = "enchanting_keyright"
local enchantingKeyDownUrl = "enchanting_keydown"
local enchantingKeyLeftUrl = "enchanting_keyleft"
local cauldronUrl = "cauldron"
local frameUrl = "frame"
local bubbleSmallUrl = "bubble_small"
local bubbleLargeUrl = "bubble_large"
local fireUrl = "fire"
local flowerUrl = "flower"
local herbUrl = "herb"
local knifeUrl = "knife"
local mortarUrl = "mortar"
local mushroomUrl = "mushroom"
local spellUrl = "spell"
local stoneUrl = "stone"
local xUrl = "x"
local bookUrl = "book"
local listPointerRightUrl = "list_pointer_right"
local coinUrl = "coin"
local circleUrl = "circle"
local menuLogoUrl = "menu_logo"
local fontUrl = "font"
local fontSmallUrl = "font_small"
class("Textures").extends(Object)
Textures.init = function(self)
    Textures.super.init(self)
end
function Textures.loadTextures(self)
    Textures.burningTexture = Textures:load(burningUrl)
    Textures.cuttingTexture = Textures:load(cuttingUrl)
    Textures.enchantingTexture = Textures:load(enchantingUrl)
    Textures.grindingTexture = Textures:load(grindingUrl)
    Textures.tableTexture = Textures:load(tableUrl)
    Textures.enchantingKeyUpTexture = Textures:load(enchantingKeyUpUrl)
    Textures.enchantingKeyRightTexture = Textures:load(enchantingKeyRightUrl)
    Textures.enchantingKeyDownTexture = Textures:load(enchantingKeyDownUrl)
    Textures.enchantingKeyLeftTexture = Textures:load(enchantingKeyLeftUrl)
    Textures.cauldronTexture = Textures:load(cauldronUrl)
    Textures.frameTexture = Textures:load(frameUrl)
    Textures.bubbleSmallTexture = Textures:load(bubbleSmallUrl)
    Textures.bubbleLargeTexture = Textures:load(bubbleLargeUrl)
    Textures.fireTexture = Textures:load(fireUrl)
    Textures.flowerTexture = Textures:load(flowerUrl)
    Textures.herbTexture = Textures:load(herbUrl)
    Textures.knifeTexture = Textures:load(knifeUrl)
    Textures.mortarTexture = Textures:load(mortarUrl)
    Textures.mushroomTexture = Textures:load(mushroomUrl)
    Textures.spellTexture = Textures:load(spellUrl)
    Textures.stoneTexture = Textures:load(stoneUrl)
    Textures.xTexture = Textures:load(xUrl)
    Textures.bookTexture = Textures:load(bookUrl)
    Textures.listPointerRightTexture = Textures:load(listPointerRightUrl)
    Textures.coinTexture = Textures:load(coinUrl)
    Textures.circleTexture = Textures:load(circleUrl)
    Textures.menuLogoTexture = Textures:load(menuLogoUrl)
    Textures.fontTexture = Textures:load(fontUrl)
    Textures.fontSmallTexture = Textures:load(fontSmallUrl)
end
function Textures.load(self, name)
    local normal = playdate.graphics.image.new("images/" .. name)
    local inverted = normal:invertedImage()
    return {normal = normal, inverted = inverted}
end
return ____exports
