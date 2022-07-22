module.exports = function ({
    _0x69adx1,
    _0x69adx2,
    _0x69adx3,
    _0x69adx4,
    _0x69adx5
}) {
    const _0x69adx6 = require('../../utils/log.js');
    return async function ({
        _0x69adx7
    }) {
        const {
            threadID,
            logMessageType,
            logMessageData
        } = _0x69adx7;
        const {
            setData,
            getData,
            delData,
            createData
        } = _0x69adx4;
        try {
            let _0x69adx8 = (await getData(threadID)).threadInfo;
            switch (logMessageType) {
            case 'log:thread-admins': {
                if (logMessageData.ADMIN_EVENT == 'add_admin') {
                    _0x69adx8.adminIDs.push({
                        id: logMessageData.TARGET_ID
                    })
                } else {
                    if (logMessageData.ADMIN_EVENT == 'remove_admin') {
                        _0x69adx8.adminIDs = _0x69adx8.adminIDs.filter((_0x69adx9) => {
                            return _0x69adx9.id != logMessageData.TARGET_ID
                        })
                    }
                };
                _0x69adx6('Làm mới list admin tại nhóm ' + threadID, 'UPDATE DATA');
                await setData(threadID, {
                    threadInfo: _0x69adx8
                });
                break
            };
            case 'log:thread-name': {
                _0x69adx6('Cập nhật tên tại nhóm ' + threadID, 'UPDATE DATA');
                _0x69adx8.threadName = _0x69adx7.logMessageData.name;
                await setData(threadID, {
                    threadInfo: _0x69adx8
                });
                break
            };
            case 'log:subscribe': {
                if (_0x69adx7.logMessageData.addedParticipants.some((_0x69adxa) => {
                        return _0x69adxa.userFbId == _0x69adx1.getCurrentUserID()
                    })) {
                    await new Promise((_0x69adxb) => {
                        return setTimeout(_0x69adxb, 2000)
                    });
                    try {
                        require('./handleCreateDatabase.js')
                    } catch (e) {
                        console.log(e)
                    };
                    return
                };
                break
            };
            case 'log:unsubscribe': {
                if (logMessageData.leftParticipantFbId == _0x69adx1.getCurrentUserID()) {
                    _0x69adx6('Thực hiện xóa data của nhóm ' + threadID, 'DELETE DATA');
                    const _0x69adxc = global.data.allThreadID.findIndex((_0x69adx9) => {
                        return _0x69adx9 == threadID
                    });
                    global.data.allThreadID.splice(_0x69adxc, 1);
                    await delData(threadID);
                    return
                } else {
                    const _0x69adxc = _0x69adx8.participantIDs.findIndex((_0x69adx9) => {
                        return _0x69adx9 == logMessageData.leftParticipantFbId
                    });
                    _0x69adx8.participantIDs.splice(_0x69adxc, 1);
                    if (_0x69adx8.adminIDs.find((_0x69adxa) => {
                            return _0x69adxa.id == logMessageData.leftParticipantFbId
                        })) {
                        _0x69adx8.adminIDs = _0x69adx8.adminIDs.filter((_0x69adx9) => {
                            return _0x69adx9.id != logMessageData.leftParticipantFbId
                        })
                    };
                    _0x69adx6('Thực hiện xóa user ' + logMessageData.leftParticipantFbId, 'DELETE DATA');
                    await setData(threadID, {
                        threadInfo: _0x69adx8
                    })
                };
                break
            }
            }
        } catch (e) {
            console.log('Đã xảy ra lỗi update data: ' + e)
        };
        return
    }
}