--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end

local function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end
-- End of Lua Library inline imports
local ____exports = {}
class("StoryStage").extends(Stage)
StoryStage.init = function(self)
    StoryStage.super.init(self)
    self.pageNumber = 0
    self.pages = {
        {"You've just graduated", "from The Magic School.", "", "Congratulations!"},
        {"After 10 long years", "of studying. You're", "finally free!"},
        {"At the School you've", "learned everything", "about magic."},
        {"You studied spell cas-", "-ting, history, making", "potions, physics and", "engineering."},
        {
            "When you were study-",
            "-ing late at the",
            "school library, you've",
            "often dreamed about",
            "seeing the world..."
        },
        {"...and living in", "Oakville."},
        {"Now finally free from", "the burden of school", "life, you've decided", "to fulfill your dream."},
        {
            "Running away from",
            "the school gate with",
            "just one small bag",
            "of your personal",
            "belongings you head",
            "to the Royal port."
        },
        {
            "You've barely managed",
            "to catch the sky ship",
            "to Oakville, and after",
            "a couple of days of",
            "traveling you arrive",
            "at your destination."
        },
        {"There you take a loan", "for 500 gold and open", "your own potion store."},
        {"You're living the", "dream. Good luck and", "have fun!"},
        {
            "",
            "",
            "",
            "",
            "Press A to begin"
        }
    }
end
function StoryStage.onActivate(self)
end
function StoryStage.update(self)
    if Input:getKeyDown("left") then
        self.pageNumber = self.pageNumber - 1
        playSound(nil, Sound.BOOK)
    end
    if Input:getKeyDown("right") then
        self.pageNumber = self.pageNumber + 1
        playSound(nil, Sound.BOOK)
    end
    self.pageNumber = clamp(
        nil,
        self.pageNumber,
        0,
        math.ceil(#self.pages / 2) - 1
    )
    if self.pageNumber == 5 and Input:getKeyDown("a") then
        Engine:changeStage(WorkshopStage())
        playSound(nil, Sound.MENU_CONFIRM)
    end
end
function StoryStage.render(self)
    Textures.bookTexture.normal:draw(0, 0)
    local t1 = self.pages[self.pageNumber * 2 + 1]
    local t2 = self.pages[self.pageNumber * 2 + 1 + 1]
    if t1 ~= nil then
        __TS__ArrayForEach(
            t1,
            function(____, line, idx)
                Font:draw(line, 47, 24 + idx * (Font.charHeightSmall + 2), true)
            end
        )
        Font:draw(
            tostring(self.pageNumber * 2 + 1),
            50,
            200
        )
    end
    if t2 ~= nil then
        __TS__ArrayForEach(
            t2,
            function(____, line, idx)
                Font:draw(line, 212, 24 + idx * (Font.charHeightSmall + 2), true)
            end
        )
        Font:draw(
            __TS__StringPadStart(
                tostring(self.pageNumber * 2 + 2),
                2,
                " "
            ),
            340,
            200
        )
    end
end
function StoryStage.onDestroy(self)
end
return ____exports
