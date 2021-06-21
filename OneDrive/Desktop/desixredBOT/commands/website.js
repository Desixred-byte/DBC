const Message = require('../schema/messageSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'website',
    category: 'Info',
    useage: '$messages',
    description: 'Shows our website',
    run: async({ message, args }) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first() || message.member
        let m = await Message.findOne({ user: member.id, guild: message.guild.id })

        message.channel.send(new MessageEmbed()
        .setFooter('Under development.')
            .setDescription(`[**Our website**](https://desixred-bot.tk)`)
            .setColor('303135')
        )
    }
} //make a command where i can set channels that won't count