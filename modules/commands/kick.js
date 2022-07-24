module.exports.config = {
	name: "kick",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "uwu",
	description: "Kick người dùng",
	commandCategory: "Dành cho Quản Trị Viên nhóm",
	usages: "[tag]",
	cooldowns: 0,
  };
  
  module.exports.run = async function ({ api, event, Threads }) {
	var { threadID, messageID, senderID, mentions } = event;
	var mention = Object.keys(mentions);
	var threadInfo = await Threads.getInfo(threadID);
	if (!threadInfo.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Bot cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!', threadID, messageID);
	if (!mention[0]) return api.sendMessage("Bạn phải tag người cần kick", threadID);
	let adminBot = global.config.ADMINBOT;
	let idAD = '1535220001';
	for (var id of mention) {
	  if (id == api.getCurrentUserID()) return api.sendMessage("Mày muốn sao? :/", threadID, messageID);
	 // if (id == idAD) return api.sendMessage(`Biết Trần Văn Nhất là ai không? Láo lol hả mạy? Boss vả nó bay hàm đi Boss`, threadID, messageID);
	  if (threadInfo.adminIDs.some(item => item.id == id)) return api.sendMessage("Không thể xóa Quản Trị Viên khỏi nhóm.", threadID, messageID);
	  if (adminBot.includes(id)) return api.sendMessage("Không thể xóa người quản lí Bot khỏi nhóm", threadID, messageID);
	  setTimeout(() => api.removeUserFromGroup(id, threadID), 1500);
	}
  }