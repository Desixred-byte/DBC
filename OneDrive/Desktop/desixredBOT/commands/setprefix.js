
module.exports = {
    name: 'setPrefix',
    category: "Utility",
    aliases: ['prefix','botprefix'],
    permissions: ['ADMINISTRATOR'],
    permissionsMessage: 'You need to have ADMINISTRATOR to run this command.',
    run: async({ message, args, client, handler }) => {
        if(!args[0]) return message.channel.send('You have to provide a prefix.')
        if(args[0].length > 1) return message.channel.send('You have to provide a correct prefix.')

        handler.prefixes.set(message.guild.id, args[0])
        message.channel.send(`Prefix has been changed to \`${args[0]}\`.`)
    }
}  //add the boost msg too i cant do $test ??