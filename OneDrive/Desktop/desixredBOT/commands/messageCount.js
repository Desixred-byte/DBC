const Message = require('../schema/messageSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'messages',
    category: 'Info',
    useage: '$messages',
    description: 'Shows how many messages does the mentioned member has.',
    run: async({ message, args }) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first() || message.member
        let m = await Message.findOne({ user: member.id, guild: message.guild.id })

        message.channel.send(new MessageEmbed()
            .setDescription(`This user has ${m ? m.messageCount : 0} messages.`)
            .setColor('303135')
        )
    }
} //DESIXRED BOIS

