module.exports = {
    config: {
        name: "permissions",
        category: 'moderation',
        description: "View and edit the permissions of a User"
    },
    onExecute: async function (message, args, QAZ) {
        let embed = new QAZ.EmbedBuilder("Permissions");
        let user;

        if(!args[1]) return message.channel.send({ embeds: [ new QAZ.EmbedBuilder("Permissions", "No user not found.").build() ] });
        user = await getUser(message, args, user);
        if(!user) return message.channel.send({ embeds: [ new QAZ.EmbedBuilder("Permissions", "No user not found.").build() ] });
        
        if(args[0] === "view"){
            await forLoopView(QAZ, embed, user.id);

            message.channel.send({ embeds: [embed.build()] });
        }

        if(args[0] === "add"){
            if(!args[2] || QAZ.PermissionHandler.permList.indexOf(args[2]) === -1) return message.channel.send("Invalid Permission. Usage: ``q.permissions add <@user> [permission]``")
            if(message.author.id !== QAZ.config.ownerID && QAZ.PermissionHandler.checkPermission(message.author.id, operator) === false) return message.channel.send({ embeds: [ new QAZ.EmbedBuilder("Permissions", "You are not permitted to do this.").build() ] });

            QAZ.PermissionHandler.addPermission(user.id, args[2]);
            embed.setDescription("Added Permission ``" + args[2] + "`` to " + user);
            message.channel.send({embeds: [embed.build()]});
        }

        if(args[0] === "remove"){
            if(!args[2] || QAZ.PermissionHandler.permList.indexOf(args[2]) === -1) return message.channel.send("Invalid Permission. Usage: ``q.permissions remove <@user> [permission]``")
            if(message.author.id !== QAZ.config.ownerID && QAZ.PermissionHandler.checkPermission(message.author.id, operator) === false) return message.channel.send({ embeds: [ new QAZ.EmbedBuilder("Permissions", "You are not permitted to do this.").build() ] });

            QAZ.PermissionHandler.removePermission(user.id, args[2]);
            embed.setDescription("Removed Permission ``" + args[2] + "`` to " + user);
            message.channel.send({embeds: [embed.build()]});
        }
    }
}

async function forLoopView(QAZ, embed, id){
    let permissions = await JSON.parse( JSON.stringify(await QAZ.PermissionHandler.getPermissions(id)));
    for(let i in permissions){
        if(permissions[i] === false){
            embed.addField(i, "False");
        }else{
            embed.addField(i, "True");
        }
    }
}

async function getUser (message, args) {
    let userTemp;

    userTemp = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);


    return userTemp
}