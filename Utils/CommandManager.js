const fs = require('fs');
const Collection = require('json-collection');

module.exports = class {
    constructor(QAZ) {
        this.QAZ = QAZ;
    }

    loadCommands = async function () {
        console.log("Loading Commands...");
        this.commands = new Collection();

        let commandFiles = fs.readdirSync(__dirname + '/../Commands/').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = __dirname + '/../Commands/' + file;
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('config' in command && 'onExecute' in command) {
                this.commands.set(command.config.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }

        console.log("Finished loading Commands!");
    }

    getAll = async function (category) {
        let temp = [];
        let json = this.commands.getJson()
        for (var i in json){
            if(category === undefined){
                temp.push({name: i, description: this.commands.get(i).config.description});
            }
            if(this.commands.get(i).config.category === category) {
                temp.push({name: i, description: this.commands.get(i).config.description});
            }
        };

        return temp;
    }

    runCommand = async function (name, message, args) {
        this.commands.get(name).onExecute(message, args, this.QAZ);
    }
}