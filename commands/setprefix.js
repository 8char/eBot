const Guild = require("../models/guild");
const { simpleEmbed } = require('../utils/simpleEmbed');

module.exports = {
	name: 'setprefix',
    description: 'Sets the prefix of the bot in the server',
    category: "info",
	async execute(message, args, client) {
        if(!args[0]) simpleEmbed(message.channel, 'Please specify what you want the prefix to be!', '#FF0000')
        if(args[0].length >= 4) simpleEmbed(message.channel, 'Your desired prefix may not be over 4 characters!', '#FF0000')
        simpleEmbed(message.channel, `Set the prefix to \`${args[0]}\``, '#00FF00')
        await Guild.findOne({ guildID: message.guild.id }, (err, res) => {
            res.prefix = args[0];
            res.save();
        })
    },
};