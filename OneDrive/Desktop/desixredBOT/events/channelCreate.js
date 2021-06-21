module.exports = async(client, channel) => {
    if(!channel.guild) return

    let role = channel.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted')
    if(!role) return

    channel.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false })
} //now can u help me with my code