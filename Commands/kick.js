module.exports = {
    config: {
        name: "kick",
        category: 'moderation',
        description: "test description"
    },
    onExecute: async function (message, args, QAZ) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if(!user) return message.channel.send({embeds: [new QAZ.EmbedBuilder("Kick", "No user specified.").build()]});

        if(! await QAZ.PermissionHandler.checkPermission(message.author.id, "kick")) return message.channel.send({embeds: [new QAZ.EmbedBuilder("Kick", "You are not permitted to do this.").build()]});

        if(user.id === message.author.id) return message.channel.send({embeds: [new QAZ.EmbedBuilder("Kick", "You can't kick yourself. If you don't want to be here, just leave the server.")]});

        await user.send({embeds: [new QAZ.EmbedBuilder("Kick", "You have been kicked from Central Virus").build()]});
        let username = user.user.username;
        await user.kick({reason: "Kicked by " + message.author.id});

        message.channel.send({embeds: [new QAZ.EmbedBuilder("Kick", "The user " + username + " has been kicked.").build()]});
    }
}