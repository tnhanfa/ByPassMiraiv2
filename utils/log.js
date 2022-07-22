const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
				console.log(chalk.bold.hex("#66FFFF").bold('😈 Lỗiiii ời 😈 ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#FFBBFF").bold('😈 Lỗiiii ời 😈') + data);
			break;
		default:
				console.log(chalk.bold.hex("#99FF33").bold(`${option} → `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#EEEEEE").bold('[ TNHAN ] ') + data);
			break;
		case "error":
		console.log(chalk.bold.hex("#FFFFFF").bold('[ TNHAN ] ') + data);
			break;
		default:
	console.log(chalk.bold.hex("#FF0000","#FF6699").bold(`[ TNHAN ]  `) + data);
			break;
	}
}