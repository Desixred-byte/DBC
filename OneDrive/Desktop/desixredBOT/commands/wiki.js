const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "addwiki",
    category: "Utility",
    run: async({ message, args, client, handler }) => {
        message.delete()
        
    message.channel.send('Wiki sent succesfully ,  ' + message.author.tag)
        const channel = client.channels.cache.get("839205577049374730");
    
        if (!channel) return message.reply("sorry too dumb to get the channel");

        channel.send("", {
            embed: new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle("New Wiki!")
            .setDescription(args.join(" "))
            .setFooter("Codes may not work!")
            

        }
        )}
}
