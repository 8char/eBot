const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    const conf = {
        guildID: guild.id
    }

    Guild.findOneAndDelete(conf, (err, res) => {
        if(err) console.error(err)
        console.log('I have been removed from a server!')
    })
}