const Discord = require('discord.js')

module.exports = {
    name: 'decline',
    category: "Suggestions",
    useage: "$accept [Message ID] , [Reason]",
    devOnly: true,
    description: 'Accepts a suggestion with a reason',
    run: async({ message, args, client, handler }) => {
        let channel = message.guild.channels.cache.get("843083082605264926")
        if (!channel) return message.reply('Error: Channel not cached');
        let msg = await channel.messages.fetch(args[0])
        if (!msg) return message.reply('Error: message not found.')
        message.delete()
        let em = new Discord.MessageEmbed(msg.embeds[0])
        em.setColor('RED')
        args.shift()
        let status = em.fields[1]
        status.name = "**Suggestion declined**"
        status.value = args.join(' ')
        msg.edit(`<@${em.footer.text}>`, {embed: em})
    }}