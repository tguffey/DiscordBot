const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tester')
        .setDescription('Ayyyyyyyyyy'),
    async execute(interaction) {
        console.log("/tester command used")
        await interaction.reply('BEEP BOOP TEST');
    },
};