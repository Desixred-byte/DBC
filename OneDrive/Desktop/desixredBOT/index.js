const colour = require("cdcolours");
const { Client } = require("discord.js");
const { CDHandler } = require("cdhandler");
const { checkBans } = require('./utils/banUtil')
const { checkMutes } = require('./utils/muteUtil')

const loadFeatures = require('./features/load-features')

// Declearing the client
const client = new Client(),
    settings = {
        prefix: 'g!',
        token: 'ODAxODcwNDg5MzQxNTI2MDM3.YAm-Fg.Mhm-WBLjgIi5zMBjun8R3DBzUbs'
    };

client.modlogs = '838283642178109531'



client.on('ready', async () => {
    new CDHandler(client, {
        commandsDir: "commands", // String - commands directory
        eventsDir: "events", // String - events directory
        featuresDir: "features", // String - features directory
        prefix: "$",
        category: "Misc", // String - Default category for commands
        pingReply: true, // Boolean - If you want the bot to reply with it's prefix when it gets pinged
        devs: [801870489341526037], // Array - Bot Developer ID's for devOnly commands.
        defaults: true, // Boolean - active default commands,
        mongo: "mongodb+srv://desixred:Ilovemykm@desixred.b8mot.mongodb.net/giveaway?retryWrites=true&w=majority", // String - Connects to MongoDB
        warnings: true, // Boolean - active CDHandler warnings
    })
    console.log(
    colour("[READY]", { textColour: "green" }) +
      ` Successfully logged in as ${client.user.tag}`,
    );

    loadFeatures(client)
    setInterval(() => checkBans(client), 5000)
    setInterval(() => checkMutes(client), 5000)
})

      //idk lol its weird wait
      //idk lol its weird wa


//have u logged in in with mongodb on  




// You can get your token by making an application at discord.dev/applications.
client.login("ODAxODI0NzcyNDY2OTMzODIx.YAmTgg.Tuh26IcykkDNFNKMAmUOTODj0rg");

// Requires Manager from discord-giveaways
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "!help",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
 });

