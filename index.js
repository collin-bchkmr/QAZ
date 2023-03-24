const {Client, GatewayIntentBits} = require('discord.js');
const config = require('./config.json');
const Collection = require('json-collection');

const fs = require('fs');

const CommandManager = require('./Utils/CommandManager');
const MessageHandler = require('./Utils/MessageHandler');
const PermissionHandler = require('./Utils/PermissionHandler');
const EmbedBuilder = require('./Utils/EmbedBuilder');

class QAZ {
    constructor(config, client){
        this.config = config;
        this.client = client;
        this.CommandManager = new CommandManager(this);
        this.MessageHandler = new MessageHandler(this);
        this.PermissionHandler = new PermissionHandler(this);
        this.EmbedBuilder = EmbedBuilder;
    
        this.startBot();
    }

    reload = async function () {
        await this.client.destroy();
        this.startBot();
    }


    startBot = async function () {
        this.CommandManager.loadCommands();

        this.client.on('ready', () => {
            this.client.user.setActivity("q.help");
        });

        this.client.on("messageCreate", message => { 
            this.MessageHandler.messageEvent(message); 
        });


        this.client.login(this.config.token);
    }
}

let qaz = new QAZ(config, new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]}))