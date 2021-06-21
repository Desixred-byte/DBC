const Ban = require('../schema/banSchema')

async function checkBans(client){
    let bans = await Ban.find({})
    for(let ban of bans){
        if(!ban.expiresOn && !ban.expiresFrom) continue
        if(ban.expiresOn < Date.now()) unbanUser(client, ban.user, ban.guild)
    }
}

async function unbanUser(client, userId, guildId){
    let guild = await client.guilds.fetch(guildId)
    if(!guild) return

    let user = await client.users.fetch(userId)
    let fetchBans = await guild.fetchBans()
    if(fetchBans.get(userId)) await guild.members.unban(user)

    await Ban.findOneAndDelete({
        user: userId,
        guild: guildId
    })
}

module.exports = {
    checkBans,
    unbanUser
}