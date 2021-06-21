const Discord = require('discord.js')

module.exports = {
    name: 'suggest',
    category: "Other",
    run: async({ message, args, client, handler }) => {
    const sayMessage = args.join(" ")
    const avatar = `${message.author.displayAvatarURL({dynamic: true})}`
    const embed = new Discord.MessageEmbed() 
    
    .setAuthor(`${message.author.username}`,avatar)   
    .addField("✨ **Suggestion**",sayMessage)
    .addField("📊 **Status**", "Waiting on the community's feedback , make sure to vote!", true) 
    .addField("🌴 **Suggest!**", "Hey if you want your suggestions to be here just type suggest with your message!", true)
    .setTimestamp()
    .setFooter(message.author.id)
     
       message.channel.send(embed).then(sentMessage => {
       message.delete()
       sentMessage.react('👍')
       sentMessage.react('👎')
})
    }
}