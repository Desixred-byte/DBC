const discord = require('discord.js')
module.exports = {
    name: `greroll`,
    category: "giveaway",
    description: "Returns ping",
    run: async({ message, args, client, handler }) => {
        const { member, mentions } = message
        if(!member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send("Hey <@" + member.id + ">, you need Giveaway manager role to host a giveaway.")
        }
        if(member.hasPermission('MANAGE_MESSAGES')) {
            let messageID = args[0];
            bot.giveawaysManager.reroll(messageID).then(() => {
                let embedSyntax = new discord.MessageEmbed()
                .setTitle("**Giveaway Rerolled!**")
                .setDescription(`Successfully rerolled the giveaway!!`)
                .setColor('GREEN')
                message.channel.send(embedSyntax)
            }).catch((err) => {
                message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
            });
        }
    }
}