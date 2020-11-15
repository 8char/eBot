module.exports = async (client) => {
    client.user.setActivity(`$ | 💳 eBOT - Automated Sales`, { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
    console.log(`Set the bot's activity to: `)
}