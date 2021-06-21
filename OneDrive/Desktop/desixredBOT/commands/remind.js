const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
module.exports = {
    name: 'reminder',
    category: "utility",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async({ message, args, client, handler }) => {
        let time = args[0]
        if(!time) return message.channel.send("Please include the time when I must remind you.")
        if(ms(time) > ms("1w")) return message.reply(`${message.author.tag} You cannot set your reminder for more than 1 week!`)

        let alert = args.slice(1).join(" ")
        if(!alert) return message.channel.send(`Please include ehat your timer is for.`)
        let embed = new MessageEmbed()
        .setAuthor(`${message.author.tag} Your reminder has been set!`)
        .setColor("303135")
        .addField(`Time:`, `\`${time}\``, true)
        .addField(`For:`, `\`${alert}\``, true)
        message.channel.send(embed)
        setTimeout(() => {
            let DP = new MessageEmbed()
            .setAuthor(`Your reminder is off!`)
            .setColor("303135")
            .addField("Duration", `\`${time}\``, true)
            .addField(`Reason:`, `\`${alert}\``, true)
            message.author.send(DP)
        }, ms(time))
    }
}