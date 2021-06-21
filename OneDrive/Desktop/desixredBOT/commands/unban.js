const Ban = require('../schema/banSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unban',
    permissions: ['BAN_MEMBERS'],
    permissionsMessage: 'You need to have BAN MEMBERS to run this command.',
    run: async({ message, args, client }) => {
        if(!args[0]) return message.channel.send(new MessageEmbed.setDescription('You have to provide ban ID.'.setColor('BLUE')))
        let id = args[0]
        if(id.length != 6) return message.channel.send('You have to provide correct ban ID. (length)') // btw can u make field in dm msg ( Banned : "field"  Action By: "user")
        let fetchBans = await message.guild.fetchBans()
        if(!fetchBans.has(member.id)) return message.channel.send('This user isn\'t banned.')

        message.guild.members.unban(ban.user)
        member?.user.send(`You have been unbanned in \`${mesage.guild.name}\` (punishment id: ${id}).`).catch()
        message.channel.send(`${member || id} has been unbanned.`)

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('New unban!')
            .addField('Admin', `<@${message.author.id}>`)
            .addField('User', `${ban.user}`)
            .addField('Reason', ban.reason)
            .addField('Punishment id', ban.id)
            .setColor('BLUE')
            .setTimestamp()
        )

        ban.delete()
    }
}

async function searchBan(id, guild){
    let bans = await Ban.find({ guild })
    for(let w of bans){
        if(w.id == id) return w
    }
}