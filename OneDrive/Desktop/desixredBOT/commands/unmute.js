const Mute = require('../schema/muteSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unmute',
    permissions: ['KICK_MEMBERS'],
    permissionsMessage: 'You need to have KICK MEMBERS to run this command.',
    run: async({ message, args, handler, client }) => {

        if(!args[0]) return message.channel.send('You have to provide mute ID.')
        let id = args[0]
        if(id.length != 6) return message.channel.send('You have to provide correct mute ID. (length)')

        let mute = await Mute.findOne({ guild: message.guild.id, id: id })
        if(!mute) return message.channel.send('You have to provide correct mute ID. (incorrect)')        
        
        let member = message.guild.members.cache.get(mute.user)
        if(!member.roles.cache.some(r => r.name.toLowerCase() == 'muted')) return message.channel.send('This user is not muted.')

        member.roles.remove(message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted'))
        member?.user.send(`You have been unmuted in \`${message.guild.name}\` (punishment id: ${id})`).catch()
        message.channel.send(`${member || id} has been unmuted.`)

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('New unmute!')
            .addField('Admin', `<@${message.author.id}>`)
            .addField('User', `<@${mute.user}>`)
            .addField('Punishment id', mute.id)
            .setColor('YELLOW')
            .setTimestamp()
        )

        mute.delete()
    }
}