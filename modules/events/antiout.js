module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐞̂𝐦 𝐥𝐚̣𝐢 𝐜𝐨𝐧 𝐚̂𝐦 𝐛𝐢𝐧𝐡 𝐧𝐚̀𝐲 ${name} 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 :( `, event.threadID)
   } else api.sendMessage(`𝐀𝐝𝐮𝐮𝐮 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐲𝐞̂𝐮 ${name} 𝐜𝐮̉𝐚 𝐭𝐚𝐨 𝐯𝐮̛̀𝐚 𝐭𝐚̂̉𝐮 𝐭𝐡𝐨𝐚́𝐭 𝐤𝐡𝐨̉𝐢 𝐧𝐡𝐨́𝐦 𝐧𝐡𝐮̛𝐧𝐠 𝐞𝐦 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐨𝐚́𝐭 𝐤𝐡𝐨̉𝐢 𝐯𝐨̀𝐧𝐠 𝐭𝐚𝐲 𝐚𝐧𝐡 𝐞𝐦 𝐢𝐮 𝐚̀ ! 𝐭𝐮 𝐛𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐚̂̀𝐧 𝐢𝐮, 𝐢𝐮 𝐞𝐦 :) 𝐠𝐚̂́𝐭 𝐧𝐡𝐢𝐞̂̀𝐮 𝐦𝐨𝐚𝐡 `, event.threadID);
  })
 }
}