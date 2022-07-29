module.exports.config = {
	name: "money",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "Tài chính",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sotienbanthan": "𝗧𝗮̀𝗶 𝗞𝗵𝗼𝗮̉𝗻 𝗡𝗴𝗮̂𝗻 𝗛𝗮̀𝗻𝗴 𝗖𝘂̉𝗮 𝗕𝗮̣𝗻 𝗖𝗼́ 💵: %1$",
		"sotiennguoikhac": "𝗧𝗮̀𝗶 𝗞𝗵𝗼𝗮̉𝗻 𝗡𝗴𝗮̂𝗻 𝗛𝗮̀𝗻𝗴 𝗖𝘂̉𝗮 %1 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́ 𝗹𝗮̀ 💵: %2$"
	},
	"en": {
		"sotienbanthan": "Your current balance: %1$",
		"sotiennguoikhac": "%1's current balance: %2$."
	}
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const money = (await Currencies.getData(senderID)).money;
		return api.sendMessage(getText("sotienbanthan", money), threadID);
	}

	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
		return api.sendMessage({
			body: getText("sotiennguoikhac", mentions[mention].replace(/\@/g, ""), money),
			mentions: [{
				tag: mentions[mention].replace(/\@/g, ""),
				id: mention
			}]
		}, threadID, messageID);
	}

	else return global.utils.throwError(this.config.name, threadID, messageID);
}
