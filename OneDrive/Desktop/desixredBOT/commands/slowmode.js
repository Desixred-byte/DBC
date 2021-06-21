const Discord = require('discord.js');
module.exports = {
    name: 'slowmode',
    category: "Utility",
    description: 'Sets SlowMode for a Channel',
    run: async({ message, args, client, handler }) => {
    if (!message.member.hasPermission("BAN_MEMBERS")){
        messages.channel.send(new Discord.MessageEmbed() .setDescription('You Cannot do that, Missing Permissions') .setColor('RED'))
        return;
    }

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('<:AYS_error:813836736043679744> | Please include how much would the slowmode be.') .setColor('RED'));
    if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed() .setDescription('<:AYS_error:813836736043679744> | Please type a real number and dont include "s,h,m" !') .setFooter('Example: $slowmode 10') .setColor('BLUE'));
    if (args[0] > 21600 || args[0] < 1) return message.channel.send(new Discord.MessageEmbed() .setDescription('Number must be between 1 - 21600') .setColor('BLUE'))

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel

        channel.setRateLimitPerUser(args[0])
        message.channel.send(new Discord.MessageEmbed() .setDescription(`<:desisuc:836983661285998656> | Slow Mode set to ${args[0]}`) .setColor('BLUE'))
        return;

    message.channel.send(new Discord.MessageEmbed() .setDescription(`<:desisuc:836983661285998656> | Slow Mode set to ${args[0]}`) .setColor('BLUE'))

    .catch((e) => {
        message.channel.send('Error Occured!')
        e ? console.error(e) : console.log('Uknown Error')
    })
}
}