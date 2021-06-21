const Discord = require('discord.js');

module.exports = {
  name: "report",
  run: async({ message, args, client, handler }) => {

const tag = message.mentions.users.first()
if(!tag) return message.reply('You must mention a user before you can report it!')

const reason = message.content.split(' ').slice(2).join(' ');
if(!reason) return message.reply('You must put a reason to report this user!')

message.channel.send('Succesfully reported the user , please check the reports channel!')

const avatar = message.author.displayAvatarURL();

const reportlog = new Discord.MessageEmbed()
.setColor('303135')
.setDescription(`Welcome to **reports** channel , here will be listed people that has been reported. If you want to report someone you can type ;report <User tag> <Reason>`)
.addField('<:report:843942066534481970> **Reported User**' , `${tag}` )
.addField('<:report:843942066534481970> **Reporter**' , `${message.author.username}` )
.addField('<:report:843942066534481970> **Reason of report**' , `${reason}`)
.setThumbnail(`${avatar}`)
.setFooter('If you want to report , $report ')
client.channels.cache.get('843939135886721095').send(reportlog)
message.delete()
message.channel.stopTyping()
    }
}