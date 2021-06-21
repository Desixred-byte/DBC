const Ban = require('../schema/banSchema')
const Warn = require('../schema/warnSchema')
const Mute = require('../schema/muteSchema')

const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'mute',
    permissions: ['KICK_MEMBERS'],
    permissionsMessage: 'You need to have KICK MEMBERS to run this command.',
    run: async({ message, args, client }) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first()
        if(!member) return message.channel.send('You have to provide an user.')

        if(member.roles.highest.position > message.member.roles.highest.position) return message.channel.send('You cannot mute this user.')
        if(member.id == message.author.id) return message.channel.send('You cannot mute yourself.')

        if(member.roles.cache.some(r => r.name.toLowerCase() == 'muted') || await Mute.findOne({ user: member.id, guild: message.guild.id})) return message.channel.send('This user is already muted.')

        if(!args[1]) return message.channel.send('You have to provide time.')

        let time = args[1].toLowerCase()
        if(time != 'forever'){
            if(!new RegExp(/^\d+(s|m|h|d)$/).test(time)) return message.channel.send('You have to provide correct time.')
        }
        
        let mutedRole = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted')
        if(!mutedRole) return message.channel.send('There aren\'t muted role.')

        let id = await generateId()
        let reason = [...args].splice(2).join(' ') || 'Breaking rules'
        message.channel.send(`${member.user.username} has been muted for \`${time}\` for ${reason}. Mute ID: \`${id}\`.`)
        member?.user.send(`You have been muted in \`${message.guild.name}\` for \`${time}\` for ${reason}. (punishment id: ${id})`).catch()
        member.roles.add(mutedRole)

        let response = {
            user: member.id,
            guild: message.guild.id,
            id: id,
            duration: time,
            reason: reason,
            admin: message.author.id
        }

        if(time != 'forever'){
            let expiresOn = Date.now()
            expiresOn += ms(time)
            expiresOn = new Date(expiresOn)

            response.expiresFrom = new Date()
            response.expiresOn = expiresOn
        }

        await new Mute(response).save()

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('New mute!')
            .addField('Admin', `<@${message.author.id}>`)
            .addField('User', `<@${member.id}>`)
            .addField('Reason', reason)
            .addField('Duration', time)
            .addField('Expires from', await getPrettyTime(response.expiresFrom))
            .addField('Expires on', await getPrettyTime(response.expiresOn))
            .addField('Punishment id', response.id)
            .setColor('RED')
            .setTimestamp()
        )
    }
}

async function generateId(){
    let IDs = []

    let warns = await Warn.find({})
    let bans = await Ban.find({})
    let mutes = await Mute.find({})

    for(let warn of warns){
        IDs.push(warn.id)
    }

    for(let ban of bans){
      IDs.push(ban.id)  
    }

    for(let mute of mutes){
        IDs.push(mute.id)  
    }

    let toReturn = 0
    for(let i = 0; i < 5; i++){
        toReturn = `${toReturn}${Math.floor(Math.random() * (9 - 0)) + 0}`
    }
    
    while(IDs.includes(toReturn)){
        generateId()
    }

    return toReturn
}

function getPrettyTime(time){
    let date = time
    let dateTimeFormat = new Intl.DateTimeFormat('en', { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })
    let [{ value: month },,{ value: day },,{ value: hour },,{ value: minute }] = dateTimeFormat .formatToParts(date )

    return `${day}.${month} ${hour}:${minute}`
}