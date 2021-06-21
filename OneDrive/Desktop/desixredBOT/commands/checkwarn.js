const Warn = require('../schema/warnSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'checkwarn',
    permissions: ['KICK_MEMBERS'],
    permissionsMessage: 'You need to have KICK MEMBERS to run this command.',
    run: async({ message, args, client, handler }) => {

        if(!args[0]) return message.channel.send('You have to provide warn ID.')
        let id = args[0]
        if(id.length != 6) return message.channel.send('You have to provide correct warn ID. (length)')

        let warn = await searchWarn(id, message.guild.id)
        if(!warn) return message.channel.send('You have to provide correct warn ID. (incorrect)')
        
        message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription([
                `Informations about warn with id \`${id}\`:`,
                ``,
                `Warned user: <@${warn.user}>`,
                `Warn guild: ${client.guilds.cache.get(warn.guild)?.name || 'deleted'}`,
                `Warn reason: ${warn.reason}`,
                `Warn admin: <@${warn.admin}>`
                
            ])
            .setColor('BLUE')
            .setTimestamp()
        )
    }
}

async function searchWarn(id, guild){
    let warns = await Warn.find({ guild })
    for(let w of warns){
        for(let userWarn of w.warns){
            if(userWarn.id == id) return userWarn
        }
    }
}