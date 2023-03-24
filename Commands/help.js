const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: "help",
        category: "help",
        description: "Shows all commands"
    },
    onExecute: async function (message, args, QAZ) {
        let category = args[0];
        let embed = new QAZ.EmbedBuilder("Help");
        if(!category) {
            embed.setDescription("Select a Category!");
            embed.addField("Moderation", "Commands used to moderate the Server.");
            message.channel.send({embeds: [embed.build()]});
            return;
        };

        let commands = await QAZ.CommandManager.getAll(category);

        embed.setDescription("Here are all commands in the ``" + category + "`` category.");

        await forLoop(commands, embed);
        message.channel.send({embeds: [embed.build()]});

    }
}

function forLoop(commands, embed){
    for(let i in commands){
        embed.addField(commands[i].name, commands[i].description);
    }
}