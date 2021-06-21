const Discord = require("discord.js")

module.exports = {
    name: "accept",
    category: "Suggestions",
    devOnly: true,
    useage: "$accept [Message ID] , [Reason]",
    description: 'Accepts a suggestion with a reason',
    run: async({ message, args, client, handler }) => {
let channel = message.guild.channels.cache.get("843083082605264926")
if (!channel) return message.reply('Error: Channel not cached');
let msg = await channel.messages.fetch(args[0])
if (!msg) return message.reply('Error: message not found.')
let em = new Discord.MessageEmbed(msg.embeds[0])
em.setColor('303135')
args.shift()
let status = em.fields[1]
status.name = "**Suggestion Accepted**"
status.value = args.join(' ')
msg.edit(`<@${em.footer.text}>`, {embed: em})}}