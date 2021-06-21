const Warn = require('../schema/warnSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unwarn',
    permissions: ['KICK_MEMBERS'],
    permissionsMessage: 'You need to have KICK MEMBERS to run this command.',
    run: async({ message, args, handler, client }) => {

        if(!args[0]) return message.channel.send('You have to provide warn ID.')
        let id = args[0]
        if(id.length != 6) return message.channel.send('You have to provide correct warn ID. (length)')

        let warn = await searchWarn(id, message.guild.id)
        if(!warn) return message.channel.send('You have to provide correct warn ID. (incorrect)')
        
        let currentWarns = warn.warns.filter(value => {
            return value.id != id
        })

        warn.warns = currentWarns
        await warn.save()

        let member = message.guild.members.cache.get(warn.user)
        member?.user.send(new MessageEmbed()
        .setDescription(`You're warnings has been cleared in \`${message.guild.name}\`.`)
        .setColor('BLUE')
    )
        message.channel.send(`${member || id} has been unwarned.`)

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('**User Unwarned**')
            .addField('**Admin**', `<@${message.author.id}>`)
            .addField('**User**', `<@${warn.user}>`)
            .setColor('BLUE')
            .setTimestamp()
        )
    }
}

async function searchWarn(id, guild){
    let warns = await Warn.find({ guild })
    for(let w of warns){
        for(let userWarn of w.warns){
            if(userWarn.id == id) return w 
        }
    }
}