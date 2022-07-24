module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: 1,
	credits: "Mirai Team & chỉnh font chữ by tnhan",
	//Chỉnh font chữ không phải là khó, nhưng cần sự kiên trì nên hãy tôn trọng công sức của tôi bỏ ra=))
	description: "tag toàn bộ thành viên",
	commandCategory: "Dành cho Quản Trị Viên nhóm",
	usages: "[Text]",
	cooldowns: 80
};

module.exports.run = async function({ api, event, args, Threads }) {
	try {
		var all = (await Threads.getInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
		var body = (args.length != 0) ? args.join(" ") : "Bạn đã bị quản trị viên kick khỏi nhóm", mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length - 1);
		    mentions.push({
		  	  tag: body[i],
		  	  id: all[i],
		  	  fromIndex: i - 1
		    });
	    }

		return api.sendMessage({ body: `‎${body}`, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}