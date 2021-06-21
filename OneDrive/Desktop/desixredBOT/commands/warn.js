const Warn = require('../schema/warnSchema')
const Ban = require('../schema/banSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warn',
    permissions: ['KICK_MEMBERS'],
    permissionsMessage: 'You need to have KICK MEMBERS to run this command.',
    run: async({ message, args, handler, client }) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first()
        if(!member) return message.channel.send('You have to provide an user.')

        if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot warn this user.')
        if(member.id == message.author.id) return message.channel.send('You cannot warn yourself.')

        let id = await generateId()
        let reason = [...args].splice(1).join(' ') || 'Breaking rules'
        let warns = await getWarns(member.id, message.guild.id) + 1

        let warning = {
            admin: message.author.id,
            user: member.id,
            guild: message.guild.id,
			reason: reason,
			date: Date.now(),
            id: id
        }
        message.channel.send(new MessageEmbed()
        .setDescription(`${member.user.username} has been warned!`)
        .addField('**Warn ID**',id )
        .addField('**Action made by**', message.author) 
        .addField('**Reason**', reason)
        .setColor('BLUE')
    )
    member?.user.send(new MessageEmbed()
    .setTitle('You have been warned!')
    .addField('**Guild**', message.guild.name)
    .addField('**Reason**', reason)
    .addField('**Moderator**', message.author)
    .addField('**Punishment ID**', id)
    .setFooter('You can use the punishment ID for appeals.')
    .setColor('BLUE')
)

        await Warn.findOneAndUpdate({ user: member.id, guild: message.guild.id }, {
			user: member.id,
			guild: message.guild.id,
			$push: { warns: warning }
		}, { upsert: true, setDefaultsOnInsert: true })

        let channel = message.guild.channels.cache.get(client.modlogs)
        channel.send(new MessageEmbed()
            .setTitle('New warn!')
            .addField('Admin', `<@${message.author.id}>`)
            .addField('User', `<@${member.id}>`)
            .addField('Reason', reason)
            .addField('Punishment id', id)
            .setColor('BLUE')
            .setTimestamp()
        )
    }
}

async function getWarns(user, guild){
    let results = await Warn.findOne({ user, guild })
    return results ? results.warns.length : 0
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