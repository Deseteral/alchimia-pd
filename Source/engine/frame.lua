--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
import("CoreLibs/nineslice")
function ____exports.drawFrame(self, x, y, w, h, clippingRegion)
    local patchSize = 9
    local slice = playdate.graphics.nineSlice.new(
        "images/frame",
        patchSize,
        patchSize,
        patchSize,
        patchSize
    )
    slice:drawInRect(x - patchSize, y - patchSize, w + patchSize * 2, h + patchSize * 2)
    playdate.graphics.setScreenClipRect(x, y, w, h)
    clippingRegion(nil)
    playdate.graphics.clearClipRect()
end
drawFrame = ____exports.drawFrame
return ____exports