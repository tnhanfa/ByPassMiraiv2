module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-color"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads,Users }) {
	const fs = require("fs");
	var iconPath = __dirname + "/emoji.json";
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;

    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`🐳 𝙏𝙃𝙊̂𝙉𝙂 𝘽𝘼́𝙊 💗 | 𝘾𝙖̣̂𝙥 𝙣𝙝𝙖̣̂𝙩 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 ${logMessageData.TARGET_ID} 𝙩𝙧𝙤̛̉ 𝙩𝙝𝙖̀𝙣𝙝 𝙦𝙪𝙖̉𝙣 𝙩𝙧𝙞̣ 𝙫𝙞𝙚̂𝙣 𝙣𝙝𝙤́𝙢 𝙩𝙝𝙖̀𝙣𝙝 𝙘𝙤̂𝙣𝙜`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`🐳 𝙏𝙃𝙊̂𝙉𝙂 𝘽𝘼́𝙊 💗 | 𝘾𝙖̣̂𝙥 𝙣𝙝𝙖̣̂𝙩 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 ${logMessageData.TARGET_ID} 𝙩𝙧𝙤̛̉ 𝙩𝙝𝙖̀𝙣𝙝 𝙩𝙝𝙖̀𝙣𝙝 𝙫𝙞𝙚̂𝙣 𝙩𝙝𝙖̀𝙣𝙝 𝙘𝙤̂𝙣𝙜`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`» [ 𝐂𝐀̣̂𝐏 𝐍𝐇𝐀̣̂𝐓 𝐍𝐇𝐎́𝐌 ]\n»  ${event.logMessageBody.replace("biểu tượng cảm xúc", "icon")}\n» Icon gốc: ${preIcon[threadID] || "không rõ"}`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
            case "log:thread-color": {
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`» [ 𝐂𝐀̣̂𝐏 𝐍𝐇𝐀̣̂𝐓 𝐍𝐇𝐎́𝐌 ]\n»  ${event.logMessageBody.replace("Chủ đề", "color")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
          
            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`🐳 𝙏𝙃𝙊̂𝙉𝙂 𝘽𝘼́𝙊 💗 | 𝘾𝙖̣̂𝙥 𝙣𝙝𝙖̣̂𝙩 𝙗𝙞𝙚̣̂𝙩 𝙙𝙖𝙣𝙝 𝙘𝙪̉𝙖 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 ${logMessageData.participant_id} 𝙩𝙝𝙖̀𝙣𝙝: ${(logMessageData.nickname.length == 0) ? "𝙩𝙚̂𝙣 𝙜𝙤̂́𝙘": logMessageData.nickname}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || "Không tên";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`🐳 𝙏𝙃𝙊̂𝙉𝙂 𝘽𝘼́𝙊 💗 | 𝘾𝙖̣̂𝙥 𝙘𝙖̣̂𝙥 𝙣𝙝𝙖̣̂𝙩 𝙩𝙚̂𝙣 𝙣𝙝𝙤́𝙢 𝙩𝙝𝙖̀𝙣𝙝 ${dataThread.threadName}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}