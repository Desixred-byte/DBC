const Message = require('../schema/messageSchema')
const channels = ['id1', 'id2'] //mat from wornoffkeys I have thanks js but i need leaderboard where is it dont have enough time to do these commands  ok at least fix my leaderboard then lol

module.exports = async(client, message) => {
    if(message.author.bot) return
    if(channels.includes(message.channel.id)) return 
    let m = await Message.findOne({ user: message.author.id, guild: message.guild.id })
    if(!m){
        await new Message({ user: message.author.id, guild: message.guild.id, messageCount: 1 }).save()
    }else{
        m.messageCount = m.messageCount + 1
        m.save()
    }
}

//I go so lets just check if it works