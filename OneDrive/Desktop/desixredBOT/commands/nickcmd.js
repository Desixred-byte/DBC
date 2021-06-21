const { MessageEmbed } = require("discord.js");

       module.exports = {
        name: "nickname",
        aliases: [],
        run: async({ message, args, client, handler }) => {

            if(!message.member.permissions.has('MANAGE_NICKNAMES')) {
                const perms = new MessageEmbed()
                .setAuthor(`${message.author.username}`)
                .setTitle('Error')
                .setColor(`#131313`)
                .setDescription('Your permissions are not enough to execute this command')
                .setFooter(`Requested By: ${message.author.username}`)
                message.channel.send(perms)
            } else {

            const nickname = message.mentions.members.first()
            let nick = "";

args.map((value, index) => {
    if (index !== 0) nick+=value+" ";
})
            nickname.setNickname(`${nick}`)
            const success = new MessageEmbed()
            .setAuthor(`${message.author.username}`)
            .setTitle('Sucess!')
            .setColor('#131313')
            .setDescription(`:verified: Succesfully changed ${nickname}'s username to ${nick}!`)
            .setFooter(`Requested By: ${message.author.username}`)

message.channel.send(success)

            .catch(err => {
                if(err) return message.channel.send('**Something went wrong**')
            })
        }
}
       }