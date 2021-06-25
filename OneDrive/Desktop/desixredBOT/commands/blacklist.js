const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
  name: 'set-avatar',
  category: 'Owner',
 run: async (client, message, args) => { // change your handler
   let avatarurl = args.join(" ");
   if(!message.author.id === '793774278872137729') return message.channel.send(':X: Only Developers Can Use This Command !')
   client.user.setAvatar(`${avatarurl}`)
   if (!avatarurl) return message.channel.send(`Usage: set-avatar <url>`)
   let embed = new Discord.MessageEmbed() 
       .setTitle('New Avatar Set')
       .setImage(`${avatarurl}`)
       .setTimestamp()
    message.channel.send(embed)
    .catch(e => {
        console.log(e)
        return message.channel.send("Something Went Wrong!")
    })
}
}