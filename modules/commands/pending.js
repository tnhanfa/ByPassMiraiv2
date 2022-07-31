module.exports.config = {
    name: "pending",
    version: "1.0.6",
    credits: "CatalizCS mod by Kadeer",
    hasPermssion: 2,
    description: "Quản lý tin nhắn chờ của bot",
    commandCategory: "Hệ thống",
    usages: "[u] [t] [a]",
    cooldowns: 5
};


module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/trogiup/menu/`;
    if (!fs.existsSync(dirMaterial + "menu")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "trogiup.jpg")) request("https://i.imgur.com/I8XXFGZ.png").pipe(fs.createWriteStream(dirMaterial + "trogiup.png"));
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
        }
        return api.sendMessage(`Từ Chối ✅`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`〖 ${global.config.PREFIX} 〗• ${(!global.config.BOTNAME) ? "ditmemay" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body:`➤ 𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n→ 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 !𝗵𝗲𝗹𝗽 𝗵𝗼𝗮̣̆𝗰 !𝗺𝗲𝗻𝘂 đ𝗲̂̉ 𝗯𝗶𝗲̂́𝘁 𝘁𝗵𝗲̂𝗺 𝗰𝗮́𝗰 𝗹𝗲̣̂𝗻𝗵`, attachment: fs.createReadStream(__dirname + "/trogiup/menu/trogiup.png")} ,handleReply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`Phê Duyệt ✅`, threadID, messageID);
    }
}

module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("Bạn có thể dùng pending:\nPending user: Hàng chờ người dùng\nPending thread: Hàng chờ nhóm\nPending all:Tất cả hàng chờ ",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const permission = ["1535220001"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Lỗi 🚫", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`Danh Sách Cần Duyệt: ${list.length} Người Dùng\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("Trống 🛡️", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
        const permission = ["1535220001"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Lỗi 🚫", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`Danh Sách Cần Duyệt: ${list.length} Nhóm\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("Trống 🛡️", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
        const permission = ["1535220001"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Lỗi 🚫", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`Danh Sách Cần Duyệt: ${list.length} User & Thread\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("Trống 🛡️", threadID, messageID);
        }
    }       
}

