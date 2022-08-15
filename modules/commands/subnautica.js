const path = require("path");
module.exports.config = {
    name: "subnautica",
    version: "2.2.0",
    hasPermssion: 0,
    credits: "Dàn code của D-Jukie, đàn cá của Heo Rừng UwU",
    description: "Câu cá ở một hành tinh khác, dựa theo tựa game Subnautica khiến bạn đái ra máu vì độ đa dạng của nó UwU",
    commandCategory: "Game",
    usages: "[]",
    cooldowns: 0,
    envConfig: {
        APIKEY: ""
    }
};

module.exports.checkPath = function (type, senderID) {
    const pathItem = path.join(__dirname, 'cauca', `item.json`);
    const pathUser = path.join(__dirname, 'cauca', 'datauser', `${senderID}.json`);
    const pathUser_1 = require("./cauca/datauser/" + senderID + '.json');
    const pathItem_1 = require("./cauca/item.json");
    if (type == 1) return pathItem
    if (type == 2) return pathItem_1
    if (type == 3) return pathUser
    if (type == 4) return pathUser_1
}

module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const axios = require("axios");

    const dir = __dirname + `/cauca/`;
    const dirCache = __dirname + `/cauca/cache/`;
    const dirData = __dirname + `/cauca/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
        recursive: true
    });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, {
        recursive: true
    });
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, {
        recursive: true
    });
    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: "https://raw.githubusercontent.com/phamvandien1/abc/main/item.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "data.json"));

    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: "https://raw.githubusercontent.com/phamvandien1/abc/main/data.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "item.json"));
    return;
}

module.exports.run = async function ({
    api,
    event,
    args,
    Users,
    Currencies
}) {
    const {
        threadID,
        messageID,
        senderID
    } = event;
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        readdirSync
    } = require("fs-extra")
    const axios = require("axios")
    const pathData = path.join(__dirname, 'cauca', 'datauser', `${senderID}.json`);
    switch (args[0]) {
    case 'register':
    case '-r': {
        const nDate = new Date().toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        if (!existsSync(pathData)) {
            var obj = {};
            obj.name = (await Users.getData(senderID)).name;
            obj.ID = senderID;
            obj.mainROD = null,
                obj.GPS = {};
            obj.GPS.locate = null,
                obj.GPS.area = null,
                obj.fishBag = [];
            obj.item = [];
            obj.timeRegister = nDate
            obj.fishBag.push({
                ID: 0,
                name: 'Đừng bán con cá này ko là lỗi tao đéo chịu trách nhiệm đâu',
                category: 'Legendary',
                size: 999999,
                sell: 0
            });
            writeFileSync(pathData, JSON.stringify(obj, null, 4));
            var msg = {body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Tạo thành công tài khoản câu cá⚔️", attachment: await this.subnautica()}
            return api.sendMessage(msg, threadID, messageID);
        } else return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Bạn đã có trong cơ sở dữ liệu⚔️", attachment: await this.subnautica()}, threadID, messageID);
    }
    case 'shop':
    case '-s': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Bạn chưa đăng kí tài khoản câu cá!\nHãy nhấn !subnautica register hoặc -r", attachment: await this.subnautica()}, threadID, messageID);
        }
        return api.sendMessage({body: "💸== 𝗙𝗜𝗦𝗛𝗜𝗡𝗚 𝗦𝗛𝗢𝗣 ==💸\n\n1. Mua cần câu 🎣\n2. Bán cá hiện có 🐟\n3. Nâng cấp/Sửa chửa cần câu 🛠\n\n💎 Reply tin nhắn này với lựa chọn của bạn", attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "shop"
            })
        }, messageID);
    }
    case 'bag':
    case '-b': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Bạn chưa đăng kí tài khoản câu cá!\nHãy nhấn !subnautica register hoặc -r", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)

        return api.sendMessage({body: `🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n1. Cá (SL: ${data.fishBag.length})\n2. Cần câu (SL: ${data.item.length})\n\n💎 Vui lòng reply vật phẩm cần xem`, attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "choosebag"
            })
        }, messageID);
    }
    case 'custom':
    case '-c': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Bạn chưa đăng kí tài khoản câu cá!\nHãy nhấn !subnautica register hoặc -r", attachment: await this.subnautica()}, threadID, messageID);
        }
        if (args[1] == 'harpoon') {
            var data = this.checkPath(4, senderID)
            var listItem = '🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n',
                number = 1;
            for (let i of data.item) {
                listItem += `${number++}. ${i.name} - Thời gian chờ: ${i.countdown}s - Tỉ lệ bền: ${i.durability}\n`
            }
            listItem += 'Vui lòng reply nếu muốn thay cần câu chính của bạn'
            return api.sendMessage(listItem, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "rodMain",
                    data: data,
                    item: data.item
                })
            }, messageID);
        }
        if (args[1] == 'locate') {
            return api.sendMessage({body: "🐙== 𝐊𝐇𝐔 𝐕𝐔̛̣𝐂 𝐂𝐀̂𝐔 ==🐙\n\n1. The Crater 🦑\n2. Sector Zero 🦀\n\n💎 Vui lòng reply kèm STT để chọn khu vực", attachment: await this.subnautica()}, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "location"
                })
            }, messageID); 
        }
    }
    case 'help': {
            return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n- R: Tạo tài khoản 👤\n- CUSTOM: Lựa chọn khu vực câu cá 🐊\n- BAG: Xem balo 🎒\n- SHOP: Cửa hàng 💰", attachment: await this.subnautica()}, threadID, messageID);
        }
    default: {
        async function checkTime(cooldown, dataTime) {
            if (cooldown - (Date.now() - dataTime) > 0) {

                var time = cooldown - (Date.now() - dataTime),
                    minutes = Math.floor(time / 60000),
                    seconds = ((time % 60000) / 1000).toFixed(0);
                return api.sendMessage(`⏰  Vui lòng mua cần câu cấp bậc cao hơn nếu muốn câu liên tục trong thời gian ngắn\n⌚ Thời gian chờ còn lại: ${minutes}:${seconds}!`, threadID, messageID);
            }
        }
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\n⚔️Bạn chưa đăng kí tài khoản câu cá!\nHãy nhấn !subnautica register hoặc -r", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)
        if (data.item.length == 0) return api.sendMessage(`Bạn chưa có cần câu, vui lòng vào shop mua và quay lại`, threadID, messageID);
        if (data.mainROD == null) return api.sendMessage('Bạn chưa chọn cần câu cá.\nVui lòng nhập `custom harpoon` và chọn cần câu', threadID, messageID);
        if (data.GPS.locate == null || data.GPS.area == null) return api.sendMessage('Bạn chưa chọn khu vực câu cá.\nVui lòng nhập `custom locate` và chọn khu vực câu', threadID, messageID);
        var rod = data.mainROD
        var location = data.GPS.locate
        var area = data.GPS.area
        var type = this.getFish()
        var findRod = data.item.find(i => i.name == rod)
        if (findRod.durability <= 0) return api.sendMessage('Cần câu bị hỏng mất rồi, bạn cần sửa chữa hoặc chọn cần câu mới', threadID, messageID);
        await checkTime(findRod.countdown * 1000, findRod.countdownData)
        findRod.countdownData = Date.now();
        findRod.durability = findRod.durability - 10;
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if (type == false) return api.sendMessage('Ôi không, bạn thật xu cà na chẳng dính con cá nào cả 😿', threadID, messageID);
        var fil = (await this.dataFish(location, area)).filter(i => i.category == type)
        if (fil.length == 0) return api.sendMessage('Ôi không, bạn thật xu cà na chẳng dính con cá nào cả 😿', threadID, messageID);
        var getData = fil[Math.floor(Math.random() * fil.length)];
        var IDF = ((this.checkPath(4, senderID)).fishBag)[parseInt(((this.checkPath(4, senderID)).fishBag).length - 1)].ID + 1;
        (this.checkPath(4, senderID)).fishBag.push({
            ID: IDF,
            name: getData.name,
            category: getData.category,
            size: getData.size,
            sell: getData.sell,
            image: getData.image
        });
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        var msg = {body: `🦈== 𝐒𝐔𝐁𝐍𝐀𝐔𝐓𝐈𝐂𝐀 ==🦈\n\nChúc mừng bạn vừa câu dính một con cá 🐬\nTên: ${getData.name}\nGiá: ${getData.sell}$\nLoại: ${getData.category}\nSize: ${getData.size}cm`, attachment: await this.image(getData.image)}
        return api.sendMessage(msg, threadID, messageID);
    }
    }
}

module.exports.dataFish =async function (a, b) {
    const data = require("./cauca/data.json");
    var loc = data.find(i => i.location == a)
    var are = loc.area.find(i => i.name == b)
    return are.creature
}

module.exports.image = async function(link) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cauca/cache/subnautica.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cauca/cache/subnautica.png`));
    return images
}
module.exports.subnautica = async function() {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get('https://i.imgur.com/pTrrcQB.png', { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cauca/cache/subnauticapage.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cauca/cache/subnauticapage.png`));
    return images
}

module.exports.getFish = function () {
    var rate = Math.floor(Math.random() * 100) + 1
    if (rate <= 4) return false
    if (rate > 4 && rate <= 34) return 'Common';
    if (rate > 34 && rate <= 59) return 'Uncommon';
    if (rate > 59 && rate <= 79) return 'Rare';
    if (rate > 79 && rate <= 94) return 'Epic';
    if (rate > 94 && rate <= 99) return 'Legendary';
    if (rate > 99 && rate <= 100) return 'Mythical';
}
module.exports.handleReply = async function ({
    event,
    api,
    Currencies,
    handleReply,
    Users
}) {

    const {
        body,
        threadID,
        messageID,
        senderID
    } = event;
    const axios = require("axios")
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        unlinkSync,
        writeFile
    } = require("fs-extra")
    const pathItem = this.checkPath(2, senderID);
    async function checkDur(a, b, c) {
        var data = require("./cauca/item.json");
        var find = data.find(i => i.name == a)
        if (c == 'rate') return (b / find.durability) * 100
        if (c == 'reset') return find.durability
        return `${b}/${find.durability} (${((b/find.durability)*100).toFixed(0)}%)`
    }
    switch (handleReply.type) {
    case 'shop': {
        if (body == 1) {
            api.unsendMessage(handleReply.messageID)
            var listItem = '🎣=== 𝗖𝗨𝗦𝗧𝗢𝗠 𝗛𝗔𝗥𝗣𝗢𝗢𝗡 ===️🎣\n\n',
                number = 1;
            for (let i of pathItem) {
                listItem += `${number++}. ${i.name} (${i.price}$) - Thời gian chờ: ${i.countdown} (Tỉ lệ bền: ${i.durability})\n\n`
            }
            return api.sendMessage(listItem + '👉 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐜𝐡𝐨 𝐛𝐚̣𝐧. 𝐌𝐨̂̃𝐢 𝐥𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐭𝐫𝐮̛̀ 𝟏𝟎 𝐬𝐮̛́𝐜 𝐛𝐞̂̀𝐧!', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "buyfishingrod"
                })
            }, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).fishBag;
            if (data.length == 0) return api.sendMessage('Túi của bạn không có gì cả!!', threadID, messageID);
            var Common = data.filter(i => i.category == 'Common')
            var Uncommon = data.filter(i => i.category == 'Uncommon')
            var Rare = data.filter(i => i.category == 'Rare')
            var Epic = data.filter(i => i.category == 'Epic')
            var Legendary = data.filter(i => i.category == 'Legendary')
            var Mythical = data.filter(i => i.category == 'Mythical')
            var listCategory = [Common, Uncommon, Rare, Epic, Legendary, Mythical];
            return api.sendMessage(`𝐂𝐡𝐨̣𝐧 𝐥𝐨𝐚̣𝐢 𝐜𝐚́ 𝐦𝐮𝐨̂́𝐧 𝐛𝐚́𝐧:\n𝟭. 𝗖𝗼𝗺𝗺𝗼𝗻 🦀 - ${Common.length}\n𝟮. 𝗨𝗻𝗰𝗼𝗺𝗺𝗼𝗻 🐚 - ${Uncommon.length}\n𝟯. 𝗥𝗮𝗿𝗲 🦐 - ${Rare.length}\n𝟰. 𝗘𝗽𝗶𝗰 🐙 - ${Epic.length}\n𝟱. 𝗟𝗲𝗴𝗲𝗻𝗱𝗮𝗿𝘆 🦈 - ${Legendary.length}\n𝟲. 𝗠𝘆𝘁𝗵𝗶𝗰𝗮𝗹 🐊 - ${Mythical.length}`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "chooseFish",
                    listCategory
                })
            }, messageID);
        }
        if (body == 3) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).item;
            var msg = `===== 𝗙𝗜𝗫 𝗜𝗧𝗘𝗠𝗦 =====\n\n`,
                number = 1;
            for (let i of data) {
                msg += `${number++}. ${i.name} - Tỉ lệ bền của cần câu: ${await checkDur(i.name, i.durability, 0)}\n`
            }
            return api.sendMessage(msg + '👉 Vui lòng reply vật phẩm muốn sửa, giá sửa bằng 1/3 giá vật phẩm', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "fixfishingrod",
                    list: data
                })
            }, messageID);
        } else return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
    }
    case 'choosebag': {
        api.unsendMessage(handleReply.messageID)
        var data = this.checkPath(4, senderID)
        if (body == 1) {
            if (data.fishBag.length == 0) return api.sendMessage('Trong túi của bạn không có con cá nào', threadID, messageID);
            var listFish = `🎒=== 𝗜𝗡𝗩𝗘𝗥𝗧𝗢𝗥𝗬 ===🎒\n\n`,
                number = 1;
            for (let i of data.fishBag) {
                listFish += `${number++}. ${i.name} (${i.size}cm) - ${i.category} (${i.sell}$)\n`
            }
            return api.sendMessage(listFish, threadID, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            if (data.item.length == 0) return api.sendMessage('Trong túi của bạn không có vật phẩm nào!', threadID, messageID);
            var listItemm = `🎒=== 𝗜𝗡𝗩𝗘𝗥𝗧𝗢𝗥𝗬 ===🎒\n\n`,
                number = 1;
            for (let i of data.item) {
                listItemm += `${number++}. ${i.name} (${i.price}$) - Tỉ lệ bền: ${i.durability} (${i.countdown}s)\n`
            }
            return api.sendMessage(listItemm, threadID, messageID);
        } else return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
    }
    case 'rodMain': {
        var data = handleReply.data;
        var item = handleReply.item;
        if (parseInt(body) > item.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        data.mainROD = item[parseInt(body) - 1].name
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(data, null, 2));
        return api.sendMessage(`🎣=== 𝗖𝗨𝗦𝗧𝗢𝗠 𝗛𝗔𝗥𝗣𝗢𝗢𝗡 ===️🎣\n\n- Đặt '${item[parseInt(body) - 1].name}' thành cần câu chính thành công!`, threadID, messageID);
    }
    case 'location': {
        const data = require("./cauca/data.json");
        if (body != 1 && body != 2) return api.sendMessage("Lựa chọn không hợp lệ 🚫", threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var listLoca = '🦈== 𝐋𝐎𝐂𝐀𝐓𝐄 𝐅𝐈𝐒𝐇 ==🦈\n\n',
            number = 1;
        for (let i of data[parseInt(body) - 1].area) {
            listLoca += `${number++}. ${i.name}\n`
        };
        (this.checkPath(4, senderID)).GPS.locate = data[parseInt(body) - 1].location
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if(body == 1) var images = 'https://i.imgur.com/SJewp15.png'
        if(body == 2) var images = 'https://i.imgur.com/FtB2vWi.png'
        return api.sendMessage({body: listLoca + 'Vui lòng chọn vùng bạn muốn câu 🐬', attachment: await this.image(images)}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "chooseArea",
                area: data[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'chooseArea': {
        var area = handleReply.area;
        var pathh = this.checkPath(4, senderID)
        var pathhh = this.checkPath(3, senderID)
        if (parseInt(body) > area.area.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        pathh.GPS.area = area.area[parseInt(body) - 1].name
        writeFileSync(pathhh, JSON.stringify(pathh, null, 2));
        return api.sendMessage(`🦈== 𝐋𝐎𝐂𝐀𝐓𝐄 𝐅𝐈𝐒𝐇 ==🦈\n\nChuyển tới vùng '${area.location} - ${area.area[parseInt(body) - 1].name}' thành công`, threadID, messageID);
    }
    case 'fixfishingrod': {
        if (parseInt(body) > handleReply.list.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        var rod = handleReply.list[parseInt(body) - 1]
        if (await checkDur(rod.name, rod.durability, 'rate') > 75) return api.sendMessage('Chỉ có thể sửa cần câu có tỉ lệ bền dưới 75%', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        await checkMoney(senderID, parseInt((rod.price * (1 / 3)).toFixed(0)))
        await Currencies.decreaseMoney(senderID, parseInt((rod.price * (1 / 3)).toFixed(0)));
        rod.durability = await checkDur(rod.name, rod.durability, 'reset')
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        return api.sendMessage(`===== 𝗙𝗜𝗫 𝗜𝗧𝗘𝗠𝗦 =====\n\n- Sửa thành công ${rod.name} (${parseInt((rod.price*(1/3)).toFixed(0))}$)`, threadID, messageID);
    }
    case 'buyfishingrod': {
        if (parseInt(body) > pathItem.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        var data = pathItem[parseInt(body) - 1]
        var checkM = await checkMoney(senderID, data.price);
        if ((this.checkPath(4, senderID)).item.some(i => i.name == data.name)) return api.sendMessage('Bạn hiện sở hữu vật phẩm này rồi', threadID, messageID);
        (this.checkPath(4, senderID)).item.push({
            name: data.name,
            price: data.price,
            durability: data.durability,
            countdown: data.countdown,
            countdownData: null,
            image: data.image
        })
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        api.unsendMessage(handleReply.messageID)
        var msg = { body: `Mua thành công ${data.name}\nGiá mua: ${data.price}$\nTỉ lệ bền: ${data.durability}\nThời gian chờ: ${data.countdown}s`, attachment: await this.image(data.image)}
        return api.sendMessage(msg, threadID, messageID);
    }
    case 'chooseFish': {
        if (parseInt(body) > handleReply.listCategory.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        api.unsendMessage(handleReply.messageID);
        if (handleReply.listCategory[parseInt(body) - 1].length == 0) return api.sendMessage('Không có con cá nào hết á, hmmmm!', threadID, messageID);
        var fish = "🐋===== 𝗙𝗜𝗦𝗛 =====🐋\n\n",
            number = 1;
        for (let i of handleReply.listCategory[parseInt(body) - 1]) {
            fish += `${number++}. ${i.name} (${i.size}cm) - Loại: ${i.category} - ${i.sell}$\n`
        }
        return api.sendMessage(fish + "👉 Reply số thứ tự và bán (có thể reply nhiều số) hoặc reply `all` nếu muốn bán tất cả", threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "sell",
                list: handleReply.listCategory[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'sell': {
        if ((parseInt(body) > handleReply.list.length || parseInt(body) <= 0) && body.toLowerCase() != 'all') return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var bag = (this.checkPath(4, senderID)).fishBag
        var coins = 0;
        if (body.toLowerCase() == 'all') {
            for (let i of handleReply.list) {
                await Currencies.increaseMoney(senderID, parseInt(i.sell));
                coins += parseInt(i.sell)
                console.log(i.ID)
                var index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == i.ID);
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(`Bán thành công ${handleReply.list.length} con cá và thu về được ${coins}$`, threadID, messageID);
        }
        else {
            var msg = 'Code_By_D-Jukie ' + body
            var chooses = msg.split(" ").map(n => parseInt(n));
            chooses.shift();
            var text = `===== 𝗦𝗘𝗟𝗟 =====\n`,
                number = 1;
            for (let i of chooses) {
                const index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == handleReply.list[i - 1].ID);
                text += `${number++}. ${bag[index].name} +${bag[index].sell}$\n`
                coins += parseInt(bag[index].sell)
                await Currencies.increaseMoney(senderID, parseInt(bag[index].sell));
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(text + `\nThu về được ${coins}$`, threadID, messageID);
        }
    }
    default: {
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage('Lựa chọn không hợp lệ 🚫', threadID, messageID);
    }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return api.sendMessage('Bạn không đủ tiền để thực hiện giao dịch này!', threadID, messageID);
    }
}