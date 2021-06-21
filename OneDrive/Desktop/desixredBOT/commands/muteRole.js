
module.exports = {
    name: 'muteRole',
    permissions: ['ADMINISTRATOR'],
    botPermissions: ['ADMINISTRATOR'],
    permissionsMessage: 'You need to have ADMINISTRATOR to run this command.',
    run: async({ message, args, client }) => {
        let role = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted')
        if(role) return message.channel.send('There is already muted role.')

        let mutedRole = await message.guild.roles.create({
            data: { //what did u type
              name: 'muted', 
            }
        })

        message.guild.channels.cache.forEach(channel => {
            channel.updateOverwrite(mutedRole, { SEND_MESSAGES: false, ADD_REACTIONS: false })
        })

        message.channel.send('Role has been created.')
    }
}
