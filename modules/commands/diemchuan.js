const axios = require('axios');
module.exports.config = {
    name: 'diemchuan',
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Xem các ngành mà với số điểm của bạn có thể học tại trường đại học",
    commandCategory: "Phương tiện",
    cooldowns: 0
}
module.exports.run = async ({ event, api, args }) => {
    const { threadID, messageID } = event;
    const score = args[0];
    const group = args[1];
    if (group == undefined || score == undefined) return api.sendMessage('group and score are required', threadID, messageID);
    const { data } = await axios.get(`https://api.phamvandien.xyz/diemchuan2021?group=${group}&score=${score}`);
    if (data.error) return api.sendMessage("Không tìm thấy dữ liệu", threadID);
    const { total, data: f } = data;
    const message = `Có ${total} kết quả phù hợp với điểm của bạn.\nVui lòng reply tin nhắn này để nhập ngành của bạn.`;
    return api.sendMessage(message, threadID, (error, info) => global.client.handleReply.push({
        type: 'reply',
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        data: f,
        score: score
    }), messageID);
}
module.exports.handleReply = async ({ event, api, handleReply }) => {
    const { threadID, messageID, body } = event;
    var sj = `<h2 style ="text-align: center">ĐIỂM CHUẨN CỦA CÁC TRƯỜNG ĐẠI HỌC MÀ BẠN CÓ THỂ VÀO</h2>`
    sj += `<a href="https://www.facebook.com/tnhantl"><h3 style="text-align:right">Nguyễn Thiện Nhân</h3></a>`
    sj += `<h3 style="text-align:right">Điểm của bạn: ${handleReply.score}</h3>`
    sj += `<table class="disme">`
    sj += `<thead><tr style="background-color: black; height: 30px; font-size: 25px; color: white;"><th width="30%">Trường</th><th width="60%">Ngành</th><th width="10%">Điểm 2021</th></tr></thead>`
    sj += `<tbody>`
    var dem = 1
    for (let i of handleReply.data) {
        var sjct = i.majors.toLowerCase()
        if (sjct.indexOf(body.toLowerCase()) != -1) {
            dem++
            sj+= `<tr>`
            sj += `<td style="font-weight: bold;padding: 10px; border: 1px solid black">${i.universityName} (${i.code})</td><td class="hide" style="padding: 10px; border: 1px solid black">${i.majors}</td><td style="padding: 10px; border: 1px solid black">${i.score}</td>`
            sj += `</tr>`
        }
    }
    sj += `</tbody></table>`
    var upcode = (await axios.post('https://api.phamvandien.xyz/upcode', { code: `${sj}`, html: true })).data
    if (upcode.status == false) return api.sendMessage('Đã có lỗi xảy ra!', threadID, messageID);
    return api.sendMessage(`Đã tìm được ${dem} kết quả phù hợp với điểm của bạn.\nXem tại đây: ${upcode.url}`, threadID, messageID)
}