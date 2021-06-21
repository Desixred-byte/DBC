const Mute = require('../schema/muteSchema')

async function checkMutes(client){
    let mutes = await Mute.find({})
    for(let mute of mutes){
        if(!mute.expiresOn && !mute.expiresFrom) continue
        if(mute.expiresOn < Date.now()) unmuteUser(client, mute.user, mute.guild)
    }
}

async function unmuteUser(client, userId, guildId){
    await Mute.findOneAndDelete({
        user: userId,
        guild: guildId
    })
    
    let guild = await client.guilds.fetch(guildId)
    if(!guild) return

    let user = guild.members.cache.get(userId)
    if(!user) return

    let mutedRole = guild.roles.cache.find(r => r.name.toLowerCase() == 'muted')
    if(!mutedRole) return

    if(!user.roles.cache.some(r => r.id == mutedRole.id)) return

    user.roles.remove(mutedRole)
}

module.exports = {
    checkMutes,
    unmuteUser
}