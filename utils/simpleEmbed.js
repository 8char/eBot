const Discord = require("discord.js");

module.exports = {
    simpleEmbed: async (channel, description, color = '#FFFFFF', thumbnail) => {
        const embed = new Discord.MessageEmbed()
            .setDescription(description)
            .setColor(color)
        if(typeof thumbnail !== 'undefined') embed.setThumbnail(thumbnail)
        return await channel.send(embed);
    }
}