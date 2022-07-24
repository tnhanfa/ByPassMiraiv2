module.exports.config = {
    name: "duyetbox",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "DungUwU",
    description: "duyệt box dùng bot xD",
    commandCategory: "Hệ thống",
    cooldowns: 5
  };
  
  
  const dataPath = __dirname + "/cache/approvedThreads.json";
  const pendingPath = __dirname + "/cache/pendingThreads.json";
  const fs = require("fs");
  
  module.exports.onLoad = () => {
    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
    if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
  }
  
  module.exports.run = async ({ event, api, args }) => {
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const { threadID, messageID, senderID } = event;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let pending = JSON.parse(fs.readFileSync(pendingPath));
    let msg = "";
    let idBox = (args[0]) ? args[0] : threadID;
    if (args[0] == "list") {
      msg = "DANH SÁCH CÁC BOX ĐÃ PHÊ DUYỆT!";
      let count = 0;
      for (e of data) {
        msg += `\n${count += 1}. ID: ${e}`;
      }
      api.sendMessage(msg, threadID, messageID);
    }
    else if (args[0] == "del") {
      idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
      if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
      api.sendMessage(`Box ${idBox} đã bị gỡ khỏi danh sách được phép dùng bot`, threadID, () => {
        if (!pending.includes(idBox)) pending.push(idBox);
        data.splice(data.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
      }, messageID)
    }
    else if (args[0] == "pending") {
      msg = "DANH SÁCH CÁC BOX CHỜ ĐƯỢC DUYỆT!";
      let count = 0;
      for (e of pending) {
        let name = (await api.getThreadInfo(e)).name || "Nhóm Chat";
        msg += `\n${count += 1}. ${name}\nID: ${e}`;
      }
      api.sendMessage(msg, threadID, messageID);
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("ID bạn nhập không hợp lệ", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`ID ${idBox} đã được phê duyệt từ trước!`, threadID, messageID);
    else api.sendMessage("» BOX ĐÃ ĐC ADMIN BOT PHÊ DUYỆT!\n» Chúc bạn sử dụng Bot vui vẻ", idBox, (error, info) => {
        api.changeNickname(`『 ${global.config.PREFIX} 』 • ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
        api.sendMessage(`➤ 𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n→ 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 ${prefix}𝗵𝗲𝗹𝗽 𝗵𝗼𝗮̣̆𝗰 ${prefix}𝗺𝗲𝗻𝘂 đ𝗲̂̉ 𝗯𝗶𝗲̂́𝘁 𝘁𝗵𝗲̂𝗺 𝗰𝗮́𝗰 𝗹𝗲̣̂𝗻𝗵`, idBox);
      if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
      else {
        data.push(idBox);
        pending.splice(pending.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
        api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, messageID);
      }
    });
  }