const Discord = require("discord.js");
const guild = require("../models/guild");

module.exports = {
	name: 'ping',
    description: 'Return the ping of the bot & the API.',
    category: "info",
	execute(message, args, client) {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad", "Oh boy, lets hope Matteo's internet isn't laggy"]
            let response = choices[Math.floor(Math.random() * choices.length)]
    
            m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(message.client.ws.ping)}\``)
        })
    },
};