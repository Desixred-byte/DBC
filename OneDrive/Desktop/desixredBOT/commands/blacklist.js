module.exports = {
    name: 'blacklist',
    description: 'blacklists a user from using the bot',



    run: async({ message, args, client, handler }) => {

        let target = message.guild.members.cache.get(args[0]) || message.mentions.members.first()

        if(!target) return message.channel.send('time to blacklist air :D')

        if(message.author.id !== 'YOUR ID (BOT OWNERS ID)') return message.channel.send('Only the bot owner can use this command.')

        if(db.fetch(`blacklistedd_${target.id}`) > 1) return message.channel.send('This person is already blacklisted.')
        
        db.add(`blacklistedd_${target.id}`, 1)




        message.channel.send(`k blacklisted ${target}`)


        
    
    }
}