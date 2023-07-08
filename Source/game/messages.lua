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
local function choice(self, list)
    local idx = randomRange(nil, 0, #list - 1)
    return list[idx + 1]
end
local function split(self, text)
    local tokens = __TS__StringSplit(text, " ")
    local msg = {}
    local line = tokens[1]
    do
        local idx = 1
        while idx < #tokens do
            local token = tokens[idx + 1]
            if #line + 1 + #token <= 37 then
                line = line .. " " .. token
            else
                msg[#msg + 1] = line
                line = token
            end
            idx = idx + 1
        end
    end
    msg[#msg + 1] = line
    return msg
end
function ____exports.newClientMessage(self, recipe)
    local greetings = {
        "Hello!",
        "Hey!",
        "Good morning!",
        "Hello there!",
        "Morning!",
        "Howdy!",
        "Good to see you!",
        "Ahoy!",
        "Hello stranger!"
    }
    local middle = {
        "How are you?",
        "It's so cold today.",
        "Beautiful day, isn't it?",
        "It looks like it's going to snow",
        "We couldn't ask for a nicer day, could we?",
        "Looking forward to the weekend?",
        "I can't believe how busy we are today!",
        "I didn't think it would be so busy today."
    }
    local ____end = {
        ("Can you make me some " .. recipe.name) .. "?",
        ("I'd like " .. recipe.name) .. ", please.",
        ("Could I have a " .. recipe.name) .. ", please?",
        ("How much for " .. recipe.name) .. "?",
        ("I need some " .. recipe.name) .. ".",
        ("Do you sell " .. recipe.name) .. "?",
        ("I'll take " .. recipe.name) .. ".",
        ("I have to buy some " .. recipe.name) .. "."
    }
    local msg = table.concat(
        __TS__ArrayFilter(
            {
                choice(nil, greetings),
                math.random() < 0.5 and choice(nil, middle) or "",
                choice(nil, ____end)
            },
            function(____, s) return #s > 0 end
        ),
        " "
    )
    return {
        text = split(nil, msg),
        rightSide = false
    }
end
function ____exports.orderCompleteMessage(self, recipe)
    local starters = {"There you go!", "Sir!", "Madame!"}
    local middle = {
        ("Your " .. recipe.name) .. ".",
        recipe.name .. " for you.",
        ("One " .. recipe.name) .. " for you.",
        ("One " .. recipe.name) .. ".",
        "Your order.",
        "This is for you.",
        "I have your order!",
        ""
    }
    local ____end = {
        "Bye!",
        "Goodbye!",
        "Bye for now!",
        "See you!",
        "Be seeing you!",
        "See you soon!",
        "Cheerio!",
        "Catch you later!"
    }
    local msg = table.concat(
        __TS__ArrayFilter(
            {
                math.random() < 0.5 and choice(nil, starters) or "",
                choice(nil, middle),
                choice(nil, ____end)
            },
            function(____, s) return #s > 0 end
        ),
        " "
    )
    return {
        text = split(nil, msg),
        rightSide = true
    }
end
function ____exports.clientGoodbyeMessasge(self)
    local list = {
        "Thank you!",
        "Bye!",
        "See you later!",
        "Perfect! Ciao!",
        "Awesome, thank you so much!"
    }
    return {
        text = split(
            nil,
            choice(nil, list)
        ),
        rightSide = true
    }
end
function ____exports.recipeDoesNotExistMessage(self)
    local list = {"What is that? Ugh!", "Yuck!", "Bleh! What have I done?!", "Oh no! How did that happen?!"}
    return {
        text = split(
            nil,
            choice(nil, list)
        ),
        rightSide = true
    }
end
function ____exports.recipeWithoutOrderMessage(self)
    local list = {"This is good, but why I've made this?", "Nobody wants this.", "Good potion, bad thinking.", "I've messed up some orders."}
    return {
        text = split(
            nil,
            choice(nil, list)
        ),
        rightSide = true
    }
end
function ____exports.dayOverMessage(self)
    return {
        text = split(nil, "It's getting late. Time to close the store."),
        rightSide = true
    }
end
newClientMessage = ____exports.newClientMessage
orderCompleteMessage = ____exports.orderCompleteMessage
clientGoodbyeMessasge = ____exports.clientGoodbyeMessasge
recipeDoesNotExistMessage = ____exports.recipeDoesNotExistMessage
recipeWithoutOrderMessage = ____exports.recipeWithoutOrderMessage
dayOverMessage = ____exports.dayOverMessage
return ____exports