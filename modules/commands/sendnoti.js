let request = require("request")
let fs = require('fs')
let axios = require('axios')
let cc = require("moment-timezone")
module.exports.config = {
	name: "sendnoti",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "Mirai mod lại by TrúcCute",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
	commandCategory: "Hệ thống",
	usages: "[Text]",
	cooldowns: 5,
  dependencies: {
    "fs": "",
    "axios": "",
    "request": ""
  }
}

module.exports.run = async ({ api, event, args, Users, handleReply }) => {
  let { senderID, messageReply, threadID, messageID, type } = event;
  let name = await Users.getNameUser(senderID)
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:s");
  if (type == "message_reply") {
    if (messageReply.attachments[0].type == "audio") {
      path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
    }
    if (messageReply.attachments[0].type == "photo") {
      path = __dirname + `/cache/snoti.jpg`
    }
    if (messageReply.attachments[0].type == "video") {
      path = __dirname + `/cache/snoti.mp4`
    }
    if (messageReply.attachments[0].type == "animated_image") {
      path = __dirname + `/cache/snoti.gif`
    }
    let abc = messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, {
      responseType: 'arraybuffer'
    })).data
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
    let allThread = global.data.allThreadID || []
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage({body: `=== [ 🔔𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡🔔 ] ===\n👻 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻: ${name}\n⏱️ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}\n📝 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${args.join(" ")}\n`, attachment: fs.createReadStream(path) }, idThread, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
          if (e) cantSend.push(idThread)
        })
        count++;
      await new Promise(resolve => setTimeout(resolve, 500));
      }
    } api.sendMessage(`Đã thông báo thành công đến ${count} nhóm\nThất bại ${cantSend.length} nhóm`, threadID)
  }
  else {
    let allThread = global.data.allThreadID || [];
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage(`=== [ 🔔𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡🔔 ] ===\n👻 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻: ${name}\n⏱️ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}\n📝 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${args.join(" ")}\n`, idThread, (error, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
          if (error) cantSend.push(idThread)
        });
        count++;
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } api.sendMessage(`Đã thông báo thành công đến ${count} nhóm\nThất bại ${cantSend.length} nhóm`, threadID)
  }
}

module.exports.handleReply = async ({ api, event, handleReply, Users, Threads }) => {
  let { body, threadID, senderID, messageID } = event;
  let index = body.split(" ")
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  let BotID = await api.getCurrentUserID();
  let threadName = await Threads.getName(threadID) || await api.getUserInfoV2(senderID)
  switch(handleReply.type) {
    case "callad": {
      let name = await api.getUserInfoV2(senderID)
      if (BotID == senderID) return
      else {
      if (event.attachments.length != 0) {
        if (event.attachments[0].type == "audio") {
    path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
  }
  if (event.attachments[0].type == "photo") {
    path = __dirname + `/cache/snoti.jpg`
  }
  if (event.attachments[0].type == "video") {
    path = __dirname + `/cache/snoti.mp4`
  }
  if (event.attachments[0].type == "animated_image") {
    path = __dirname + `/cache/snoti.gif`
  }
        let abc = event.attachments[0].url;
  let getdata = (await axios.get(`${abc}`, {
    responseType: 'arraybuffer'
  })).data
  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
        api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n-> ${index.join(" ")}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`, attachment: fs.createReadStream(path)}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
        }, handleReply.ID)
      } else if (index.length != 0) {
        api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n-> ${index.join(" ")}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
        }, handleReply.ID)
      }
    }
    }
  }
}

module.exports.handleReaction = async ({ api, event, handleReaction, Users, Threads }) => {
  let { threadID, senderID, messageID, reaction, userID } = event;
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let threadName = await Threads.getName(threadID) || await Users.getNameUser(senderID);
  switch(handleReaction.type) {
    case "callad": {
      let name = await Users.getNameUser(userID);
      api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗖𝗮̉𝗺 𝘅𝘂́𝗰: ${reaction}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`}, handleReaction.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
      }, handleReaction.ID)
    }
  }
}