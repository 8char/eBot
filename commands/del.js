module.exports = {
	name: 'del',
    description: 'Deletes a message',
    category: "info",
	execute(message, args, client) {
        client.emit('guildDelete', client, message.channel.guild);
    },
};