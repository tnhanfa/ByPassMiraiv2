/*
@credit Trankhuong
@chỉnh sửa credit cái con cặc
*/
const fs = require("fs");
module.exports.config = {
    name: "cave",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Trankhuong dz",
    description: "Làm cave random quốc gia",
    commandCategory: "Tài chính",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 60
    },
    denpendencies: {
        "fs": "",
        "request": ""
}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "cave.jpg")) request("https://i.imgur.com/bSFfTQR.jpg").pipe(fs.createWriteStream(dirMaterial + "cave.jpg"));
}
module.exports.handleReply = async ({ 
    event:e, 
    api, 
    handleReply, 
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    let data = (await Currencies.getData(senderID)).data || {};
if (handleReply.author != e.senderID) 
return api.sendMessage("Nó làm cave có phải mày đâu mà rep", e.threadID, e.messageID)

var a = Math.floor(Math.random() * 100) + 1000; 
var b = Math.floor(Math.random() * 100) + 1000; 
var c = Math.floor(Math.random() * 100) + 1000; 
var x = Math.floor(Math.random() * 100) + 1000; 
var y = Math.floor(Math.random() * 100) + 1000; 
var f = Math.floor(Math.random() * 100) + 1000; 

  var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            var t = Date.parse("") - Date.parse(new Date()),
            m = Math.floor( (t/00/60) % 60 ),
            h = Math.floor( (t/(00*60*60)) % 24 ),
            d = Math.floor( t/(00*60*60*24) ); 
           
            switch(e.body) {
                case "1": msg = `🇻🇳 Bạn vừa làm cave ở Việt Nam và được ${a} đồng`;
                await Currencies.increaseMoney(e.senderID, parseInt(a)); 
                break;             
                case "2": msg = `🇨🇳 Bạn vừa làm cave ở Trung Quốc và được ${b} đồng`; 
                await Currencies.increaseMoney(e.senderID, parseInt(b)); 
                break;
                case "3": msg = `🇯🇵  Bạn vừa làm cave ở Nhật Bản và được ${c} đồng`;
                await Currencies.increaseMoney(e.senderID, parseInt(c)); 
                break;
                case "4": msg = `🇹🇭 Bạn vừa làm cave ở Thái Lan và được ${x} đồng`; 
                await Currencies.increaseMoney(e.senderID, parseInt(x)); 
                break;
                case "5": msg = `🇺🇸 Bạn vừa làm cave ở Mỹ và được ${y} đồng`; 
                await Currencies.increaseMoney(e.senderID, parseInt(y)); 
                break;
                case "6": msg = `🇰🇭 Bạn vừa làm cave ở Campuchia và được ${f} đồng`; 
                await Currencies.increaseMoney(e.senderID, parseInt(f)); 
                break;
                default: break;
            };
            const choose = parseInt(e.body);
            if (isNaN(e.body)) 
            return api.sendMessage("Reply từ 1 -> 6 để chọn Quốc Gia", e.threadID, e.messageID);
            if (choose > 6 || choose < 1) 
            return api.sendMessage("Không có trong danh sách", e.threadID, e.messageID); 
            api.unsendMessage(handleReply.messageID);
            if (msg == "...") {
                msg = "...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}


module.exports.run = async ({  
    event:e, 
    api, 
    handleReply, 
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    var   t = Date.parse("") - Date.parse(new Date()),
    d = Math.floor( t/(10*60*00) ),
    h = Math.floor( (t/(10*60*00)) % 00 ),
    m = Math.floor( (t/10/60) % 00 );

    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            hours = Math.floor((time / (10* 60 ))/00),
            minutes = Math.floor(time / 10),
            seconds = ((time % 30) / 00).toFixed(0); 
        return api.sendMessage(`💫 Nghỉ ngơi đi`, e.threadID, e.messageID);
    }
    else {    
        var msg = {
            body: "========== 𝗖𝗔𝗩𝗘 =========="+`\n`+
                "\n1 ≻ 🇻🇳 Vietnam" +
                "\n2 ≻ 🇨🇳 China" +
                "\n3 ≻ 🇯🇵 Japan" +
                "\n4 ≻ 🇹🇭 Thailand" +
                "\n5 ≻ 🇺🇸 America" +
                "\n6 ≻ 🇰🇭 Campuchia" +
                `\n\n💬 Reply to this message to select a country`,
                attachment: fs.createReadStream(__dirname + `/cache/cave.jpg`)}
                return api.sendMessage(msg,e.threadID,  (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: e.senderID,
            messageID: info.messageID
          })  
        })
    }
}

