module.exports.config = {
	name: "leaveNoti",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "HĐGN",
	description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝘁𝘂̛̣ 𝗯𝗮̂́𝗺 𝗻𝘂́𝘁 𝗯𝗶𝗲̂́𝗻" : "𝗯𝗶̣ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝘀𝘂́𝘁";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `${threadID}.gìf`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = " {name} 𝘃𝘂̛̀𝗮 {type} 𝗸𝗵𝗼̉𝗶 𝗯𝗼𝘅 𝗱𝗼 𝗻𝗴𝗵𝗶𝗲̣̂𝗽 𝗰𝗵𝘂̛𝗼̛́𝗻𝗴 𝗾𝘂𝗮́ 𝗻𝗮̣̆𝗻𝗴. 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 {name} 𝗰𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗮̉𝗶 𝗻𝗴𝗵𝗶𝗲̣̂𝗽. 𝗦𝗮𝘆 𝗴𝗼𝗼𝗱𝗯𝘆𝗲 𝘃𝗮̀ 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗲̣𝗻 𝗻𝗴𝗮̀𝘆 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 🍑" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}