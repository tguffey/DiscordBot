const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        if (interaction.user.id === "416592169780903937") {
            await interaction.reply(":bangbang: LITTLE DOG DETECTED :bangbang: LITTLE DOG DETECTED :bangbang:")
        }
        else if (interaction.user.id === "300050440672903168") {
            await interaction.reply("What's up?")
        }
        else {
            await interaction.reply('Pong!');
        }
        console.log("/ping command used")
    },
};