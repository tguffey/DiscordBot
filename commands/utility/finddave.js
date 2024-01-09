const { SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finddave')
        .setDescription('Looks for Dave Winters in the server'),
    async execute(interaction) {
        let dave = {
            "name":"Dave Winters",
            "id":"749783793598201857"
        }
        let guild = await interaction.client.guilds.cache.get(guildId);

        console.log("fetching users")
        let res = await guild.members.fetch()

        let message = `:eyes: \nScanning for \`\`\`Name: ${dave.name} \t ID: ${dave.id} \`\`\`...`
        let found = false
        res.forEach((member) => {
           if (member.id === dave.id) {
            found = true
            message += `\n:bangbang:Found Dave!:bangbang: ${member.user.name} \t ${member.id} `
           }
        })

        if (!found) {
            message += "\nSeems like I couldn't find Dave :white_check_mark: "
        }
        await interaction.reply(message)
        
    }
        
};