const Warn = require('../schema/warnSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clearwarns',
    run: async({ message, args, handler }) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('You dont have permissions to execute this command.')
            .setColor('RED')
            .setTimestamp()
        )
        
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members?.first()
        if(!member) return message.channel.send('You have to provide an user.')
        
        if(await getWarns(member.id, message.guild.id) == 0) return message.channel.send('This user doesn\'t have any warns.')

        await Warn.findOneAndDelete({ user: member.id, guild: message.guild.id })
        message.channel.send(`You have deleted all \`${member.user.username}'s\` warns.`)
    }
}

async function getWarns(user, guild){
    let results = await Warn.findOne({ user, guild })
    return results ? results.warns.length : 0
}
//test it out k