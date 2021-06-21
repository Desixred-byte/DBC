module.exports = async(client, newMember, oldMember) => {
    if(!oldMember.premiumSince && newMember.premiumSince){
        let channel = newMember.guild.channels.cache.get('844557971831783434') //add here id of the channel where the message should be sent
        channel.send(new MessageEmbed()(([
            `Thank you <@${newMember.id}> , thanks for **boosting** our server!`,
            `Since you have become a booster , you will gain these perks:`,
            ``,
            `**1)** Nitro boost 10$ !`,
            `**2)** Nitro booster role !`,
            `**3)** Desixred Premium !`,
            `**4)** Custom commands !`
        ])).join('\n'))
    }

}
        