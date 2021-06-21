const Ban = require('../schema/banSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'checkban',
    permissions: ['BAN_MEMBERS'],
    permissionsMessage: 'You need to have BAN MEMBERS to run this command.',
    run: async({ message, args, client, handler }) => {

        if(!args[0]) return message.channel.send('You have to provide ban ID.')
        let id = args[0]
        if(id.length != 6) return message.channel.send('You have to provide correct ban ID. (length)')

        let ban = await searchBan(id, message.guild.id)
        if(!ban) return message.channel.send('You have to provide correct ban ID. (incorrect)')
        
        let response = [
            `Informations about ban with id \`${id}\`:`,
            ``,
            `Banned user: <@${ban.user}>`,
            `Ban guild: ${client.guilds.cache.get(ban.guild)?.name || 'deleted'}`,
            `Ban reason: ${ban.reason}`,
            `Ban admin: <@${ban.admin}>`,
            `Ban duration: ${ban.duration}`
        ]

        if(ban.expiresOn && ban.expiresFrom){
            response.push(`Ban expiresFrom: ${await getPrettyTime(ban.expiresFrom)}`)
            response.push(`Ban expiresOn: ${await getPrettyTime(ban.expiresOn)}`)
        }

        message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(response)
            .setColor('BLUE')
            .setTimestamp()
        )
    }
}

async function searchBan(id, guild){
    let bans = await Ban.find({ guild })
    for(let w of bans){
        if(w.id == id) return w
    }
}

function getPrettyTime(time){
    let date = time
    let dateTimeFormat = new Intl.DateTimeFormat('en', { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })
    let [{ value: month },,{ value: day },,{ value: hour },,{ value: minute }] = dateTimeFormat .formatToParts(date )

    return `${day}.${month} ${hour}:${minute}`
}
