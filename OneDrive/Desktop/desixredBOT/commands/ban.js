const Ban = require('../schema/banSchema')
const Warn = require('../schema/warnSchema')
const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ban',
    permissions: ['BAN_MEMBERS'],
    permissionsMessage: 'You need to have BAN MEMBERS to run this command.',
    run: async({ message, args, client }) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first()

        if(!member) return message.channel.send(new MessageEmbed().setDescription('You have to provide a user.').setColor('BLUE'))

        if(member.roles.highest.position > message.member.roles.highest.position || !member.bannable) return message.channel.send(new MessageEmbed().setDescription('You cannot ban this user.').setColor('BLUE'))
        if(member.id == message.author.id) return message.channel.send(new MessageEmbed().setDescription('You cannot ban yoursef.').setColor('BLUE'))

        let fetchBans = await message.guild.fetchBans()
        if(fetchBans.has(member.id) || await Ban.findOne({ user: member.id, guild: message.guild.id})) return message.channel.send('This user is already banned.')

        if(!args[1]) return message.channel.send(new MessageEmbed().setDescription('You have to provide time.').setColor('BLUE'))

        let time = args[1].toLowerCase()
        if(time != 'forever'){
            if(!new RegExp(/^\d+(s|m|h|d)$/).test(time)) return message.channel.send(new MessageEmbed().setDescription('You have to provide correct time.').setColor('BLUE'))
        }
        
        let id = await generateId()
        let reason = [...args].splice(2).join(' ') || 'Breaking rules'

        message.channel.send(new MessageEmbed()
            .setDescription(`${member.user.username} has been banned for \`${time}\` for ${reason}. Ban ID: \`${id}\`.`)
            .setColor('BLUE')
        )
        // how to make this command send to channel wait il show
        member?.user.send(new MessageEmbed()
            .setTitle('You have been banned!')
            .setDescription('[**Appeal here**](https://docs.google.com/forms/u/1/d/1UU8-gEbpXdwMNA7BpRr-orhrpONffT2aP8tgoEj8V3o/edit?usp=drive_open)')
            .addField('**Guild**', message.guild.name)
            .addField('**Duration**', time)
            .addField('**Reason**', reason)
            .addField('**Punishment ID**', id)
            .setFooter('You can use the punishment ID for appeals.')
            .setColor('BLUE')
        ).catch()

        member.ban({ reason })
        //i crtl v from github
        // do u know how to make inv track
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

        await new Ban(response).save()

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('User banned!')
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

    for(let warn of warns){
        IDs.push(warn.id)
    }

    for(let ban of bans){
      IDs.push(ban.id)  
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