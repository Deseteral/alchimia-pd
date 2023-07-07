--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.clamp(self, num, min, max)
    return math.min(
        math.max(num, min),
        max
    )
end
function ____exports.randomRange(self, min, max)
    return math.floor(math.random() * (max - min + 1) + min)
end
clamp = ____exports.clamp
randomRange = ____exports.randomRange
return ____exports