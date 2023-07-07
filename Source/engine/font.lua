--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local __TS__StringSplit
do
    local sub = string.sub
    local find = string.find
    function __TS__StringSplit(source, separator, limit)
        if limit == nil then
            limit = 4294967295
        end
        if limit == 0 then
            return {}
        end
        local result = {}
        local resultIndex = 1
        if separator == nil or separator == "" then
            for i = 1, #source do
                result[resultIndex] = sub(source, i, i)
                resultIndex = resultIndex + 1
            end
        else
            local currentPos = 1
            while resultIndex <= limit do
                local startPos, endPos = find(source, separator, currentPos, true)
                if not startPos then
                    break
                end
                result[resultIndex] = sub(source, currentPos, startPos - 1)
                resultIndex = resultIndex + 1
                currentPos = endPos + 1
            end
            if resultIndex <= limit then
                result[resultIndex] = sub(source, currentPos)
            end
        end
        return result
    end
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end
-- End of Lua Library inline imports
local ____exports = {}
class("Font").extends(Object)
Font.init = function(self)
    Font.super.init(self)
end
function Font.draw(self, text, x, y, small)
    if small == nil then
        small = false
    end
    __TS__ArrayForEach(
        __TS__StringSplit(text, ""),
        function(____, letter, idx)
            local w = small and Font.charWidthSmall or Font.charWidth
            local h = small and Font.charHeightSmall or Font.charHeight
            local sx = ((string.byte(letter, 1) or 0 / 0) - 32) * w
            local t = small and Textures.fontSmallTexture.normal or Textures.fontTexture.normal
            t:draw(
                x + idx * w,
                y,
                playdate.graphics.kImageUnflipped,
                playdate.geometry.rect.new(sx, 0, w, h)
            )
        end
    )
end
function Font.lineLengthPx(self, text, small)
    local w = small and Font.charWidthSmall or Font.charWidth
    return #text * w
end
Font.charWidth = 10
Font.charWidthSmall = 7
Font.charHeight = 20
Font.charHeightSmall = 14
return ____exports
