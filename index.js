const {
    spawn
} = require('child_process');
const {
    readFileSync
} = require('fs-extra');
const http = require('http');
const axios = require('axios');
const semver = require('semver');
const logger = require('./utils/log');
const chalk = require('chalk');
const chalkercli = require('chalkercli');
var randomColor = Math.floor(Math.random() * 16777215).toString(16);
const CFonts = require('cfonts');
const dashboard = http.createServer(function (_0x9520xa, _0x9520xb) {
    _0x9520xb.writeHead(200, 'OK', {
        "Content-Type": 'text/plain'
    });
    _0x9520xb.write('Welcome to back');
    _0x9520xb.end()
});
dashboard.listen(process.env.port || 0);
logger('Hệ thống Tnhan Bot được remake từ Miraiv2 do TNHAN duy trì và phát triển', '🛠 VN');
logger('The Tnhan Bot system is a remake of Miraiv2 maintained and developed by TNHAN', '🛠 VN');
logger('🛠 Donate Mbbank: 000030012007', 'DONATE');
const rainbow = chalkercli.rainbow(`\
[=== 𝐒𝐄𝐓𝐓𝐈𝐍𝐆 𝐁𝐎𝐓 ===]\
`).stop();
rainbow.render();
const frame = rainbow.frame();
console.log(frame);
logger('TNHAN BOT SUCCESSFULLY INITIALIZED', 'TNHAN');
logger('Welcome back to Tnhan Bot', 'TNHAN');
logger('TNHAN BOT PROJECT start running...', 'TNHAN');
logger('Checking the version...', 'UPDATE');
logger('Your version is the latest!', 'UPDATE');
function startBot(_0x9520xf) {
    (_0x9520xf) ? logger(_0x9520xf, 'TNHAN BOT STARTING'): '';
    const _0x9520x10 = spawn('node', ['--trace-warnings', '--async-stack-traces', 'mirai.js'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
    });
    _0x9520x10.on('close', async (_0x9520x11) => {
        var _0x9520x12 = 'codeExit' ['replace']('codeExit', _0x9520x11);
        if (_0x9520x11 == 1) {
            return startBot('BOT RESTARTING!!!')
        } else {
            if (_0x9520x12.indexOf(2) == 0) {
                await new Promise((_0x9520x13) => {
                    return setTimeout(_0x9520x13, parseInt(_0x9520x12.replace(2, '')) * 1000)
                });
                startBot('Bot has been activated please wait a moment!!!')
            } else {
                return
            }
        }
    });
    _0x9520x10.on('error', function (_0x9520x14) {
        logger('An error occurred: ' + JSON.stringify(_0x9520x14), 'Starting')
    })
}
axios.get('https://raw.githubusercontent.com/tnhanfa/Version/main/package.json').then((_0x9520xb) => {
    logger(_0x9520xb.data.name, 'NAME');
    logger('version: ' + _0x9520xb.data.version, 'VERSION');
    logger(_0x9520xb.data.description, 'DESCRIPTION')
});
setTimeout(async function () {
    CFonts.say('TNHAN', {
        font: 'block',
        align: 'center',
        gradient: ['red', 'magenta']
    });
    CFonts.say(`${'Bot Messenger Created By TNHAN'}`, {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    });
    const rainbow = chalkercli.rainbow(`\
[=== 𝐀𝐂𝐓𝐈𝐕𝐄 𝐁𝐎𝐓 ===]\
`).stop();
    rainbow.render();
    const frame = rainbow.frame();
    console.log(frame);
    logger('Bắt đầu load source code', 'LOAD');
    startBot()
}, 70);
async function bank() {
    const {
        readdirSync,
        readFileSync,
        writeFileSync,
        existsSync,
        copySync
    } = require('fs-extra');
    const {
        join,
        resolve
    } = require('path');
    const _0x9520x16 = join(__dirname + '/modules/commands/banking/banking.json');
    const logger = require('./utils/log.js');
    const _0x9520x17 = require('./modules/commands/banking/banking.json');
    const _0x9520x18 = 60 * 60;
    const _0x9520x19 = 0.01;
    if (_0x9520x17[0] == undefined) {
        return
    };
    while (true) {
        for (let _0x9520x1a of _0x9520x17) {
            var _0x9520x1b = _0x9520x17.find((_0x9520x1c) => {
                return _0x9520x1c.senderID == _0x9520x1a.senderID
            });
            var _0x9520x1d = _0x9520x1b.money;
            _0x9520x1b.money = (parseInt(_0x9520x1d + _0x9520x1d * _0x9520x19));
            writeFileSync(_0x9520x16, JSON.stringify(_0x9520x17, null, 2))
        };
        logger.loader('ĐANG XỬ LÍ BANK');
        await new Promise((_0x9520x13) => {
            return setTimeout(_0x9520x13, _0x9520x18 * 1000)
        })
    }
}
bank()