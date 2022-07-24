const path = require("path");
const { mkdirSync, writeFileSync, existsSync,readFileSync, createReadStream, readdirSync } = require("fs-extra")
const axios = require("axios")
//
module.exports.config ={
  name: "football",
  version: "3.9.10",
  hasPermssion: 0,
  credits: "a-repGit",//Nguyen Quoc Anh
  description: "",
  commandCategory: "Game",
  usages: "Prefix [Football]", 
  cooldowns: 5,
  envConfig: {}};
  //
module.exports.onLoad = () => {
 const chalk = require('chalk');
  console.log(chalk.bold.hex("# 473C8B").bold("--SUCCESFULLY LOADED THE FOOTBALL COMMAND--"));
 const dir = __dirname + `/Football@GameSport/datauser/`;
    const _dir = __dirname + `/Football@GameSport/datauser/`;
    const __dir = __dirname + `/Football@GameSport/cache/`;
    const ___dir = __dirname + `/Football@GameSport/dataCoin/`;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(_dir)) mkdirSync(_dir, { recursive: true });
    if (!existsSync(__dir)) mkdirSync(__dir, { recursive: true });
    if (!existsSync(___dir)) mkdirSync(___dir, { recursive: true });
    return;
}
//
module.exports.checkPath = function (type, senderID) {
    const pathGame = path.join(__dirname, 'Football@GameSport', 'datauser', `datauser.json`);
    const pathGame_1 = require("./Football@GameSport/datauser/" + senderID + '.json');
    const pathCoin = path.join(__dirname, 'Football@GameSport', 'dataCoin', `datauserCoin.json`);
    if (type == 1) return pathGame
    if (type == 2) return pathGame_1
    if (type == 3) return pathCoin
}
//
  module.exports.languages = {
    "vi" : {
      "filming" : "=>Đang Quay....<="
    }
  }
  //
module.exports.run = async ({event,api,handleReply,Currencies,getText
}) => {
  const fs = require("fs-extra");
  const axios = require("axios");
  var {threadID, messageID} = event;
  return api.sendMessage({
    body: `Ⓜ️irai Championship\n─────────────\n📤1. Register / register\n🎮2.Play / play\n🎰3.Spin / spin\n🪙4.fCoin / fcoin\n🛒5.Market / market\n📇6.Daily / daily\n⚙️7.Help / help\n📂8.ThongTinFile `,
  }, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "choose",
      name: this.config.name,
      author: event.senderID,
      messageID: info.messageID
    })
  },messageID)
}
//
module.exports.handleReply = async function({args,event,Users,api,handleReply,getText,Currencies}) {
  const {threadID,messageID,senderID,body} = event;
  var {type} = handleReply;
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request');

  //data register
  const pathData = path.join(__dirname, 'Football@GameSport', 'datauser', `datauser.json`);
  const dataCoin = path.join(__dirname,'Football@GameSport', 'dataCoin', `datauserCoin.json`)
  var msg = "";
         //
  switch (type) {
   case "choose" : {
    switch (body) {
     case "ThongTinFile":
      case "thongtinfile": {
       if (!existsSync(pathData)) { return api.sendMessage('📢 Người Dùng Chưa Đăng Kí', threadID, messageID); }
       if (this.config.hasPermssion == "0"){
             msg = "Người Dùng"
           } else if(this.config.hasPermssion== "1") {
             msg = "Quản Trị Viên Box"
           } else if(this.config.hasPermssion == "2") {
             msg = "Quản Trị Viên Bot"
           }
          return api.sendMessage({body:`📢 Tên Lệnh: ${this.config.name}\n📤 Phiên Bản: ${this.config.version}\n📵 Quyền Sử Dụng: ${msg}\n👤 Sáng Tạo: ${this.config.credits}\n🗒️ Mô tả: ${this.config.description}\n➡️ Cách Dùng: ${this.config.usages}\n⌛ Thời Gian Chờ: ${this.config.cooldowns}S`},threadID,messageID)
      } break;
     case "register" :
      case "Register": {
       const nDate = new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh'
            });
             
        const datauser1 = path.join(__dirname, 'Football@GameSport','datauser', 'datauser.json');
        const dataUserJson = JSON.parse(readFileSync(__dirname + "/Football@GameSport/datauser/datauser.json"));
            if (!dataUserJson.find(i => i.uid == senderID)) {
                dataUserJson.push({
              name : (await Users.getData(senderID)).name,
              uid : senderID,
              level : 0,
              item : 0,
              player : 0
                 })
                //
                writeFileSync(datauser1, JSON.stringify(dataUserJson, null, 4));
                return api.sendMessage("☑️ Đăng Kí Tài Khoản Thành Công\nSố tiền trong tài khoản : 200$", threadID, messageID);
            }else return api.sendMessage("📢 Bạn Đã Có Trong Cơ Sở Dữ Liệu", threadID, messageID);  } break;
      case "Spin": 
       case "spin": {
        if (!existsSync(pathData)) { return api.sendMessage('📢 Người Dùng Chưa Đăng Kí', threadID, messageID); }
        msg = `Ⓜ️SPIN LUCKY PLAYER\nCan 50000 fcoin de quay\ncu phap [spin lucky player]`;
        return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "SpinChoose",
      name: this.config.name,
      author: event.senderID,
      messageID: info.messageID
    })
  },messageID)}break;
     case "fCoin" :
      case "fcoin": {
 if (!existsSync(pathData)) { return api.sendMessage('📢 Người Dùng Chưa Đăng Kí', threadID, messageID); }
 //
 msg = `🏦[ Football Banking ]\n💳@Xem Số fCoin Bạn Hiện Có, Cú Pháp [myfcoin]`;
    return api.sendMessage({body: msg},threadID, (error, info) => {
    global.client.handleReply.push({
      type: "fCoinChoose",
      name: this.config.name,
      author: event.senderID,
      messageID: info.messageID
    })
  },messageID)} }}break;
  case "SpinChoose" : {
   switch(body) {
    case "Spin Lucky Player":
    case "spin lucky player":{
     const reply = function (reply){
  return api.sendMessage(reply, threadID,messageID)
};
                //
          var char = ["Neymar","Adama Traoré", "Luka Modrić","Sadio Mané","Lionel Messi"];
          var random = Math.floor(Math.random() * char.length);
          if (char[random] == "Neymar") {
            var link = "https://i.imgur.com/pOlv8fC.jpeg"
          } else if (char[random] == "Adama Traoré") {
            var link = "https://i.imgur.com/utfdwQu.jpeg"
          } else if (char[random]== "Luka Modrić") {
         var link = "https://i.imgur.com/f6y3mmc.jpeg"
          }else if (char[random] == "Sadio Mané") {
           var link = "https://i.imgur.com/CWYsA6x.jpeg"
          } else if (char[random]== "Lionel Messi") {
           var link = "https://i.imgur.com/kvLqdIU.jpeg"
          }
          const img = (await axios.get(link, {
            responseType: "stream"
          })).data;
          //quay
      reply(getText("filming"));
      setTimeout(() => {reply({body: `(Result) [ Bạn Quay Được Cầu Thủ ] ->  ${char[random]}`,attachment: img})}, 3000);
    }
   }
  }break;
  case "fCoinChoose" : {
   switch(body) {
    case "myfcoin":
    case "MyfCoin":{
     const fCoinOfUser = path.join(__dirname, 'Football@GameSport','dataCoin', 'datauserCoin.json');
     //
     const CoinOfUserJson = JSON.parse(readFileSync(__dirname + "/Football@GameSport/dataCoin/datauserCoin.json"));
     //
     if (!CoinOfUserJson.find(i => i.uid == senderID)) {
                CoinOfUserJson.push({
              name : (await Users.getData(senderID)).name,
              uid : senderID,
              coin : 200
                 })
                //
                writeFileSync(fCoinOfUser, JSON.stringify(CoinOfUserJson, null, 4));
     } 
     
    }}}
   }
  }