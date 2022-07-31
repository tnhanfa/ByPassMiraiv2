module.exports = function({ api }) {
    const react = "";
	return function({ event }) {
        const { senderID, type, reaction, messageID } = event;
        if (senderID == api.getCurrentUserID()) {
            if (reaction == "😗") return api.unsendMessage(messageID);
        }		
	};
};