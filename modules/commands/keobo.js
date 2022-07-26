const axios = require("axios");
module.exports.config = {
    name: "keobo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Araxy XD",
    description: "",
    commandCategory: "Game",
    usages: "",
    cooldowns: 0
};
module.exports.run = async ({ api, event, Threads, args, Currencies }) => {
const { threadID, messageID, senderID } = event;
if(args[0] == "help"){
  let imag = (await axios.get("https://i.ibb.co/LdhS9J9/keobo-Banner.jpg", {
        responseType: "stream"
      })).data;
  var msg = { body: '🐮==== [ 𝐊𝐄́𝐎 𝐁𝐎̀ ] ====🐮\n\n𝗡𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝗼̛𝗶 𝗯𝗮̣𝗻 𝗵𝗮̃𝘆 𝗻𝗵𝗮̣̂𝗽 𝗹𝗲̣̂𝗻𝗵 𝗻𝗵𝘂̛ 𝘀𝗮𝘂:\n!𝗸𝗲𝗼𝗯𝗼 [𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻] (𝘁𝗼̂́𝗶 𝘁𝗵𝗶𝗲̂̉𝘂 𝗹𝗮̀ 𝟱𝟬$)\n𝗟𝘂̛𝘂 𝘆́: 𝘁𝗶̉ 𝗹𝗲̣̂ 𝗰𝗮̀𝗻𝗴 𝗰𝗮𝗼 𝘁𝗵𝗶̀ 𝗰𝗮̀𝗻𝗴 𝗱𝗲̂̃ 𝘁𝗿𝘂́𝗻𝗴 𝘁𝗵𝘂̛𝗼̛̉𝗻𝗴 ❤️',
attachment: imag 
}
    return api.sendMessage(msg, threadID, messageID)
  }
if(!args[0] || isNaN(args[0])){
    return api.sendMessage('𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐧𝐡𝐚̣̂𝐩 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐜𝐮̛𝐨̛̣𝐜 𝐡𝐨𝐚̣̆𝐜 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂ 🚫', threadID, messageID)
    }
 else {
   if (await checkMoney(senderID, 50) == false){return api.sendMessage('𝐘𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐨́ 𝐢́𝐭 𝐧𝐡𝐚̂́𝐭 𝟓𝟎$ 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐤𝐞́𝐨 𝐛𝐨̀ 🐮', threadID, messageID)}
     await Currencies.decreaseMoney(senderID, parseInt(args[0]));
var tile_1 = Math.floor(Math.random() * 100)
    var tile_2 = Math.floor(Math.random() * 100)
    var tile_3 = Math.floor(Math.random() * 100)
    var tile_4 = Math.floor(Math.random() * 100)
    var tile_5 = Math.floor(Math.random() * 100)
  var sotien_1 = args[0]
  var sotien_2 = args[0] * 2
  var sotien_3 = args[0] * 12
  var sotien_4 = args[0] * 144
  var sotien_5 = args[0] * 2880
let gif = (await axios.get("https://i.ibb.co/2dgF3vf/keobogif.gif", {
        responseType: "stream"
      })).data;
  const cuoc = parseInt(args[0])
  var msg = { body: `🐮==== [ 𝐊𝐄́𝐎 𝐁𝐎̀ ] ====🐮\n\n𝟭. 𝗕𝗼̀ 𝟭 (${sotien_1}$) || 𝗧𝘆̉ 𝗟𝗲̣̂ ${tile_1}\n𝟮. 𝗕𝗼̀ 𝟮 (${sotien_2}$) || 𝗧𝘆̉ 𝗟𝗲̣̂ ${tile_2}\n𝟯. 𝗕𝗼̀ 𝟯 (${sotien_3}$) || 𝗧𝘆̉ 𝗟𝗲̣̂ ${tile_3}\n𝟰. 𝗕𝗼̀ 𝟰 (${sotien_4}$) || 𝗧𝘆̉ 𝗟𝗲̣̂ ${tile_4}\n𝟱. 𝗕𝗼̀ 𝟱 (${sotien_5}$) || 𝗧𝘆̉ 𝗟𝗲̣̂ ${tile_5}\n\n𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐤𝐞̀𝐦 𝐒𝐓𝐓 𝐜𝐮̉𝐚 𝐜𝐨𝐧 𝐛𝐨̀ 𝐦𝐚̀ 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐛𝐚̆́𝐭 𝐧𝐡𝐞́ 🐮`,
   attachment: gif
}
return api.sendMessage(msg, threadID, (err, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
            cuoc
        });
    }, messageID)
}
   async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return false;
        else return true;
    }
}
module.exports.handleReply = async ({ api, Currencies, event, handleReply }) => {
const { threadID, senderID, messageID, body } = event;
  const { cuoc, author } = handleReply;
   const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
if (author !== senderID) { return api.sendMessage('𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐜𝐡𝐨̣𝐧 🐮', threadID, messageID)};
 if(!("keobo" in global.client)) global.client.keobo = {}
 if(isNaN(body)) return api.sendMessage("𝐁𝐚̣𝐧 𝐩𝐡𝐚̉𝐢 𝐧𝐡𝐚̣̂𝐩 𝐦𝐨̣̂𝐭 𝐬𝐨̂́ 🐮", threadID);
if(1 > body || body > 5) return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐡𝐢̉ 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐭𝐮̛̀ 𝟏 𝐭𝐨̛́𝐢 𝟓 🐮", threadID, messageID);
  if(body == "1"){
    var tienan = cuoc,
    win = "https://i.imgur.com/gCVBt2m.jpg",
      losse = "https://i.imgur.com/2aLDp2l.jpg"
  }
  else if(body == "2"){
    var tienan = cuoc * 2,
    win = "https://i.imgur.com/JZlPizj.jpg",
      losse = "https://i.imgur.com/DGtAxqn.jpg"
  }
  else if(body == "3"){
    var tienan = cuoc * 12,
    win = "https://i.imgur.com/jOsSqV0.jpg",
      losse = "https://i.imgur.com/ESxi5p1.jpg"
  }
  else if(body == "4"){
    var tienan = cuoc * 144,
    win = "https://i.imgur.com/aodV8o8.jpg",
      losse = "https://i.imgur.com/Trt51zw.jpg"
  }
  else if(body == "5"){
    var tienan = cuoc * 2880,
    win = "https://i.imgur.com/kCcmQP3.jpg",
      losse = "https://i.imgur.com/zwGMSpH.jpg"
  }
  if( moneyUser < tienan){
    return api.sendMessage(`Bạn Không Đủ Tiền Để Chọn Con Bò Số ${body} với số tiền là ${tienan} và bạn còn thiếu ${tienan - moneyUser}`, threadID)
  } else {
  
var msg = `𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐜𝐡𝐨̣𝐧 𝐛𝐨̀ ${body} 𝐯𝐚̀ 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ 𝐥𝐚̀ ${tienan}\n𝐍𝐡𝐚̣̂𝐩 "𝐤𝐞́𝐨" 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐛𝐚̆́𝐭 𝐜𝐨𝐧 𝐛𝐨̀\n𝐕𝐚̀ 𝐥𝐢𝐞̂𝐧 𝐭𝐮̣𝐜 𝐧𝐡𝐚̣̂𝐩 "𝐤𝐞́𝐨" 𝐭𝐫𝐨𝐧𝐠 𝟏𝟎𝐬 𝐬𝐚𝐮 `;

const keobo = (msg, bo) => api.sendMessage(msg, threadID, (err, info) => {
        global.client.keobo[senderID] = {
            spam: 10,
            count: 0,
            bo,
            stt: body,
            author: senderID,
            tienan: tienan,
          win: win,
          lose: losse
        }
    })
keobo(msg, body.trim())
}
}
module.exports.handleEvent = async({ api, event, Currencies, Users }) => {
  const { threadID, senderID, body } = event;
    if(!("keobo" in global.client)) global.client.keobo = {};
    if (!([senderID] in global.client.keobo)) return;
    const { increaseMoney, decreaseMoney } = Currencies;
  if(body == "kéo" || body == "Kéo") {
        global.client.keobo[senderID].count++;
     if (global.client.keobo[senderID].count > 1) return;
    setTimeout(async () => {
      let name1 = await Users.getNameUser(senderID)
      let reward = global.client.keobo[senderID].tienan * 2
      let type_bo = global.client.keobo[senderID].stt
       let type_bo_win = global.client.keobo[senderID].win
      let type_bo_lose = global.client.keobo[senderID].lose
      if( type_bo == '1'){
        var choose = ["true", "false"]
      var ans = choose[Math.floor(Math.random() * choose.length)]
      if( ans == "false" || global.client.keobo[senderID].count < 5){
        let imag = (await axios.get(type_bo_lose, {
        responseType: "stream"
      })).data;
        var msg = { body: `${name1} 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐡𝐮̣𝐭 𝐯𝐚̀ 𝐛𝐢̣ 𝐛𝐨̀ 𝐪𝐮𝐚̣̂𝐭 𝐥𝐚̣𝐢\n𝐌𝐚̂́𝐭 ${global.client.keobo[senderID].tienan}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
                delete global.client.keobo[senderID];
            })
      } else {
         let imag = (await axios.get(type_bo_win, {
        responseType: "stream"
      })).data;
        var msg = { body: `𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 ${name1} 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐭𝐫𝐮́𝐧𝐠\n𝐍𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ ${reward}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
          await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            })
      }  
      } else if( type_bo == '2'){
        var choose = ["true", "false", "false", "false","false","true"]
      var ans = choose[Math.floor(Math.random() * choose.length)]
      if( ans == "false" || global.client.keobo[senderID].count < 7){
         let imag = (await axios.get(type_bo_lose, {
        responseType: "stream"
      })).data;
        var msg = { body: `${name1} 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐡𝐮̣𝐭 𝐯𝐚̀ 𝐛𝐢̣ 𝐛𝐨̀ 𝐪𝐮𝐚̣̂𝐭 𝐥𝐚̣𝐢\n𝐌𝐚̂́𝐭 ${global.client.keobo[senderID].tienan}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
                delete global.client.keobo[senderID];
            })
      } else {
         let imag = (await axios.get(type_bo_win, {
        responseType: "stream"
      })).data;
        var msg = { body: `𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 ${name1} 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐭𝐫𝐮́𝐧𝐠\n𝐍𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ ${reward}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
          await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            })
      }  
      } 
      else if( type_bo == '3'){
        var choose = ["true", "false", "false", "false","false","true","false","false"]
      var ans = choose[Math.floor(Math.random() * choose.length)]
      if( ans == "false" || global.client.keobo[senderID].count < 8){
let imag = (await axios.get(type_bo_lose, {
        responseType: "stream"
      })).data;
        var msg = { body: `${name1} 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐡𝐮̣𝐭 𝐯𝐚̀ 𝐛𝐢̣ 𝐛𝐨̀ 𝐪𝐮𝐚̣̂𝐭 𝐥𝐚̣𝐢\n𝐌𝐚̂́𝐭 ${global.client.keobo[senderID].tienan}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
                delete global.client.keobo[senderID];
            })
      } else {
         let imag = (await axios.get(type_bo_win, {
        responseType: "stream"
      })).data;
        var msg = { body: `𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 ${name1} 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐭𝐫𝐮́𝐧𝐠\n𝐍𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ ${reward}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
          await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            })
      }  
      } else if( type_bo == '4'){
        var choose = ["true", "false", "false", "false","false","true","false","false","false","false","false","false","false","true"]
      var ans = choose[Math.floor(Math.random() * choose.length)]
      if( ans == "false" || global.client.keobo[senderID].count < 9){
      let imag = (await axios.get(type_bo_lose, {
        responseType: "stream"
      })).data;
        var msg = { body: `${name1} 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐡𝐮̣𝐭 𝐯𝐚̀ 𝐛𝐢̣ 𝐛𝐨̀ 𝐪𝐮𝐚̣̂𝐭 𝐥𝐚̣𝐢\n𝐌𝐚̂́𝐭 ${global.client.keobo[senderID].tienan}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
                delete global.client.keobo[senderID];
            })
      } else {
         let imag = (await axios.get(type_bo_win, {
        responseType: "stream"
      })).data;
        var msg = { body: `𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 ${name1} 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐭𝐫𝐮́𝐧𝐠\n𝐍𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ ${reward}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
          await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            })
      }  
      }
      else if( type_bo == '5'){
        var choose = ["true", "false", "false", "false","false","true","false","false","false","false","false","false","false","true","true","false","fale","fale"]
      var ans = choose[Math.floor(Math.random() * choose.length)]
      if( ans == "false" || global.client.keobo[senderID].count < 10){
       let imag = (await axios.get(type_bo_lose, {
        responseType: "stream"
      })).data;
        var msg = { body: `${name1} 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐡𝐮̣𝐭 𝐯𝐚̀ 𝐛𝐢̣ 𝐛𝐨̀ 𝐪𝐮𝐚̣̂𝐭 𝐥𝐚̣𝐢\n𝐌𝐚̂́𝐭 ${global.client.keobo[senderID].tienan}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
                delete global.client.keobo[senderID];
            })
      } else {
         let imag = (await axios.get(type_bo_win, {
        responseType: "stream"
      })).data;
        var msg = { body: `𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 ${name1} 𝐯𝐮̛̀𝐚 𝐤𝐞́𝐨 𝐭𝐫𝐮́𝐧𝐠\n𝐍𝐡𝐚̣̂𝐧 𝐯𝐞̂̀ ${reward}$ 🐮`, attachment: imag }
        return api.sendMessage(msg, threadID, async () => {
          await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            })
        }}}, 10000);
    }
     }