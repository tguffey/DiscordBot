const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('write')
        .setDescription('Write data to local JSON'),
    async execute(interaction) {
        console.log("File write started\n");
        let obj = {
            recipeName: 'lasagna'
        }
        try {
            // Writing the object as a JSON string to the database file
            fs.writeFileSync('db.json', JSON.stringify(obj));
            return console.log('Save successful');  // Log success message
        } catch (err) {
            return console.log('Save failed');  // Log failure message
        }
        //await interaction.reply('Data Write Successful');
    },
};