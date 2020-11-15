const Guild = require('../models/guild');

module.exports = async (client, message) => {
	if(message.channel.type === 'dm') {
		var prefix = '$'
	} else {
		var { prefix } = await Guild.findOne({
			guildID: message.guild.id
		})
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
}