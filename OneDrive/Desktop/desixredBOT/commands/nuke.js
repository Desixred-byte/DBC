const discord = require('discord.js')

module.exports = {
    name: "say",
    desciption: "say command",
    category: "utility",

    run: async({ message, args, client, handler }) => {
        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}