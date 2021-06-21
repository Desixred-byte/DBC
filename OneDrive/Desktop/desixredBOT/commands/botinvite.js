const discord = require('discord.js')
module.exports = {
    name: 'invite',
    category: "info",
    description: "Invite bot",
    run: async({ message, args, client, handler }) => {
        const { member, mentions } = message
        let embedSyntax = new discord.MessageEmbed()
        .setTitle("**Invite bot**")
        .setDescription(`**We have made a bot that can help you maintain your server!**`)
        .addFields(

            { name: 'Desixred', value: '[**<:invite:814880108350275615> Add Desixred <:invite:814880108350275615>**](https://desixred-bot.tk/invite)' },
            { name: 'Our Website', value: '[**<:invite:814880108350275615> Bot Website <:invite:814880108350275615>**](https://desixred-bot.tk)', inline: true },
        )
        .setFooter("Win many rewards just for inviting our bpt!")
        .setTimestamp()
        .setAuthor("Host easy giveaways with desixred!")
        .setColor('BLUE')
        message.channel.send(embedSyntax)
    }
}