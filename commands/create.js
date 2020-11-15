const Discord = require("discord.js")
const uEmbed = require('../utils/simpleEmbed')
const stripIndent = require('strip-indent')
const Packages = require('../models/packages')
const mongoose = require('mongoose');
const validator = require("email-validator");

module.exports = {
	name: 'create',
    description: 'Used to create packages.',
    category: "info",
	async execute(message, args, client) {
        uEmbed.simpleEmbed(message.channel, '📦 Please specify the product name!', '#96CBFD')

        const filter = response => message.author === response.author
        const name = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})

        uEmbed.simpleEmbed(message.channel, '📝 Please specify the product details!', '#96CBFD')
        const details = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})

        uEmbed.simpleEmbed(message.channel, '⚙️ Please specify the product features!', '#96CBFD')
        const features = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})

        function isInteger(value) {
            if(parseInt(value,10).toString()===value) {
              return false
            }
            return true;
          }

        uEmbed.simpleEmbed(message.channel, '💳 Please specify the product price!', '#96CBFD')
        const price = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})
        if(isInteger(price.first().content)) return uEmbed.simpleEmbed(message.channel, 'The specified price is not a number, aborting!', '#FF0000')

        function isEmail(email){
          return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );	
        }

        uEmbed.simpleEmbed(message.channel, '📧 Please state the email adress of the paypal buissness account that this product will be linked to!', '#96CBFD')
        let email = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})
        if(!validator.validate(email.first().content)) return uEmbed.simpleEmbed(message.channel, 'This is not a valid email adress, aborting!', '#FF0000')


        uEmbed.simpleEmbed(message.channel, '📺 Please specify the channel which this is going to be sent to!', '#96CBFD')
        const channelP = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']})
        const channelId = channelP.first().content.replace('<#','').replace('>','')
        const channel = message.guild.channels.cache.get(channelId)
        if(!channel.text == 'text') return uEmbed.simpleEmbed(message.channel, 'That is not a channel, aborting!', '#FF0000')

        const embed = new Discord.MessageEmbed()
            .setDescription(stripIndent(`
            **📦 PRODUCT NAME**
            ${name.first().content}

            **📝 PRODUCT DETAILS**
            ${details.first().content}

            **⚙️ FEATURES**
            ${features.first().content}

            **💳 PRICE:** *$${price.first().content}*

            *Click the 📦 Reaction to purchase this product!*
            `))
            .setColor('#96CBFD')
            .setFooter(`Litsting made by ${message.author.tag} (${email.first().content})`)
            .setTimestamp()
        const prod = await channel.send(embed)
        prod.react('📦')

        const package = new Packages({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            messageID: prod.id,
            channelID: prod.channel.id,
            productName: name.first().content,
            productFeatures: features.first().content,
            productPayee: email.first().content,
            productPrice: price.first().content,
        });
    
        package.save()

        uEmbed.simpleEmbed(message.channel, `<a:tick:777339318243033108> Success! The product listing has been started [here](https://discord.com/channels/${message.channel.guild.id}/${channel.id}/${prod.id} 'Click me to go to the listing!')!`, '#00FF00')
    },
};