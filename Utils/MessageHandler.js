module.exports = class {
    constructor(QAZ) {
        this.QAZ = QAZ;
    }

    messageEvent = async function (message) {
        if(message.author.bot) return;
        if(!message.content.startsWith(this.QAZ.config.prefix)) return;
        let command = message.content.slice(this.QAZ.config.prefix.length).split(" ")[0];
        let args = message.content.slice(this.QAZ.config.prefix.length + command.length).split(" ");
        args.shift();

        this.QAZ.CommandManager.runCommand(command, message, args);
    }
}