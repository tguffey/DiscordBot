const { SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finduser')
        .setDescription('Looks for a user in the server by user ID')
        .addStringOption(option => 
            option.setName('id')
                .setDescription('user ID of user to look for')
                .setRequired(true)),
    async execute(interaction) {
        let dave = {
            "name":"Dave Winters",
            "id": interaction.options.getString('id')
        }
        let guild = await interaction.client.guilds.cache.get(guildId);

        console.log("fetching users")
        let res = await guild.members.fetch()

        let message = `:eyes: \nScanning for \`\`\`ID: ${dave.id} \`\`\` `
        let found = false
        res.forEach((member) => {
           if (member.id === dave.id) {
            found = true
            message += `\n:rotating_light: :rotating_light: :rotating_light: \n***Found!***\n:rotating_light: :rotating_light: :rotating_light: \`\`\`Name: ${member.user.username} \t ID: ${member.id} \`\`\` `
           }
        })

        if (!found) {
            message += "\nSeems like I couldn't find user :white_check_mark: "
        }
        await interaction.reply(message)
        
    }
        
};