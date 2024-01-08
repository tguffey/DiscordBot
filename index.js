// Importing required modules
const fs = require('node:fs');  // File system module for handling file operations
const path = require('node:path');  // Path module for working with file and directory paths
const { Client, Collection, GatewayIntentBits } = require('discord.js');  // Importing required classes and enums from discord.js
const { token } = require('./config.json');  // Importing token from config.json file

// Creating a new Discord client instance with specified intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Initializing a collection to store command data
client.commands = new Collection();

// Defining the path to the commands directory and reading its contents
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Iterating through each command folder
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Iterating through each command file in the folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Validating if the command has required properties
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Defining the path to the events directory and reading its contents
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Iterating through each event file in the directory
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    // Attaching event handlers based on 'once' property
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Logging in the client using the provided token
client.login(token);