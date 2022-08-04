module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "DũngUwU",
    description: "out box",
    commandCategory: "Hệ Thống",
    usages: "[tid]",
    cooldowns: 3
  };
  
  module.exports.run = async function({ api, event, args }) {
    const permission = ["1535220001"()];
    if (!permission.includes(event.senderID))
    return api.sendMessage("Quyền lồn biên giới 👻", event.threadID, event.messageID);
    var id;
    if (!args.join(" ")) {
      id = event.threadID;
    } else {
      id = parseInt(args.join(" "));
    }
    return api.sendMessage('Đã nhận lệnh out box từ Admin. Chào tạm biệt và hẹn gặp lại 👻',id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
  }