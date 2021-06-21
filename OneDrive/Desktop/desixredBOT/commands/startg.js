const { MessageEmbed }= require('discord.js');
const ms = require('ms');

const embedSyntax = new MessageEmbed()
.setTitle("**Syntax Error**")
.setDescription(`There was an error in the syntax with your command!`)
.addField(`Command Syntax`, `$giveaway [length (1s, 1m, 1h, etc)] [winner count] [channel] [prize]`, false)
.setColor('RED')

const embedError = new MessageEmbed()
.setTitle("Command Error!")
.setDescription("There was an error running the command, please try again!")
.setColor("RED")

const embedSuccess = new MessageEmbed()
.setTitle("**Giveaway Started!**")
.setDescription("Successfully started the giveaway! <a:aGZ_Wumpus_Like:814412221530243083>")
.setFooter("Remember , this bot is very easy to use.")
.setColor("BLUE")

module.exports = {
    name: `giveaway`,
    category: "giveaway",
    description: "Returns ping",
    run: async({ message, args, client, handler }) => {
        if (!member.permissions.has('MANAGE_MESSAGES') && // .hasPermission will be deprecated in v13
            !message.member.roles.filter(r => r.name.toLowerCase() === 'giveaway manager')
        ) 
            return message.channel
                .send(`Hey ${message.author}, you need a 'Giveaway Manager' role or 'MANAGE_MESSAGES' permission to host a giveaway.`);
                
        const channel = message.guild.channels.cache.get(args[2]) || message.mentions.channels.first(); 
        const prize = args.slice(3)?.join(" ");
        const time = ms(args[0]);
                
        if (!args[0] || 
            !time || 
            isNaN(args[1]) || 
            !channel || 
            !prize
        )
            return message.channel.send(embedSyntax);
                
        try {
            client.giveawaysManager.start(channel, {
                time,
                prize,
                hostedBy: message.author, // If this displays weird then do what u had before (I don't use packages like this so idk how it does it) --> `<@${message.author.id}>` or message.author.tag 
                winnerCount: parseInt(args[1])
            
            });
        } catch(err) {
            console.log(err);
            return message.channel.send(embedError);
        }
        
        message.channel.send(embedSuccess);
        message.delete();
    }
}