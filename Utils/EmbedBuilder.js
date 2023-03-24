const { EmbedBuilder, Embed } = require("discord.js");

module.exports = class {
    constructor(title, description){
        this.embed = new EmbedBuilder();
        if(title) this.embed.setTitle(title);
        if(description) this.embed.setDescription(description);
    }

    addField = async function(name, value, inLine) {
        this.embed.addFields({
            name: name, 
            value: value,
            inline: inLine || false
        });
    }

    setTitle = function (title) {
        this.embed.setTitle(title);
    } 

    setDescription = function(description) {
        this.embed.setDescription(description);
    }

    setAuthor = function(author) {
        this.embed.setAuthor(author);
    }

    setColor = function(color) {
        this.embed.setColor(color);
    }

    setTimestamp = function(timestamp) {
        this.embed.setTimestamp(timestamp);
    }

    setFooter = function(footer) {
        this.embed.setFooter(footer);
    }

    setImage = function(image) {
        this.embed.setImage(image);
    }

    build = function(){
        return this.embed;
    }

}