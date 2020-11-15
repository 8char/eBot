const {Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose')

client.categories = fs.readdirSync('./commands/')

config({
    path: `${__dirname}/.env`
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')) 

commandFiles.forEach(file => {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`🤖 Loaded the command ${file.split('.')[0]}! ✅`)
});

// Register the events using an eventhandler

fs.readdir('./events/', (err, files) => {
    //Incase of an error, log it and then return
    if (err) return console.error;
    //Filter the array so that only javascript files remain
    files.filter(file => file.endsWith('.js'))
    //Itterate through all of the files in the folder events
    files.forEach(file => {
        //Define a variable with the file required
        const evt = require(`./events/${file}`)
        //Get the name without the file extension @ the end
        let evtName = file.split('.')[0]
        console.log(`📅 Loaded the event ${evtName}! ✅`)
        //Finally bind the event
        client.on(evtName, evt.bind(null, client))
    })
})

client.mongoose.init()
client.login(process.env.TOKEN)