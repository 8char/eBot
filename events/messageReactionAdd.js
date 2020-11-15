const Package = require('../models/packages');
const { simpleEmbed } = require('../utils/simpleEmbed')
const { payGen } = require('../utils/payGen')
const Discord = require('discord.js')

module.exports = async (client, reaction, user) => {
    if(user.bot) return
    const package = await Package.findOne({ messageID: reaction.message.id })
    if(reaction.emoji.name === '📦') {
        if(package) {
            const edit = await simpleEmbed(user, 'Please wait while we generate the payment link!')

            const link = await (await payGen(package.productPrice, 'USD')).replace('"','').replace('"','');
            const embed = new Discord.MessageEmbed()
                .setTitle('**Complete your order!**')
                .setDescription(`Almost done!\n💳 [Click here to complete your order!](${link} 'Click Me!')`)
                .setThumbnail('https://assets.materialup.com/uploads/1200b530-1f70-4b83-8120-71e8ab03d0f6/preview.gif')
                .setColor('#96CBFD')
            await edit.edit(embed)
            reaction.remove(user.id)
        }
    }
}