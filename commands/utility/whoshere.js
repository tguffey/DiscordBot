const { SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whoshere')
        .setDescription('Lists every user in the server and their user id'),
    async execute(interaction) {
        let guild = await interaction.client.guilds.cache.get(guildId);
        console.log("fetching users")
        let message = ":eyes: \nLooking to see who's here..."
        let res = await guild.members.fetch()
        res.forEach((member) => {
            console.log(member.user.username)
            console.log(member)
            message = message + `\n${member.user.username} \t${member.id}`
        })
        await interaction.reply(message)
        
    }
        
};