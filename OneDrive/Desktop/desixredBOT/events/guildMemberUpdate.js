module.exports = async(client, newMember, oldMember) => {
    if(!oldMember.premiumSince && newMember.premiumSince){
        let channel = newMember.guild.channels.cache.get('844557971831783434') //add here id of the channel where the message should be sent
        channel.send((([
            `Thank you <@${newMember.id}> , thanks for **boosting** our server!`,
            `Since you have become a booster , you will gain these perks:`,
            ``,
            `**1)** Nitro boost 10$ !`,
            `**2)** Nitro booster role !`,
            `**3)** Desixred Premium !`,
            `**4)** Custom commands !`
        ])).join('\n'))

        user.send(new MessageEmbed()
        .setTitle('**Booster Perks Notice**')
        .setAuthor('Boost Reminder', 'https://cdn.discordapp.com/attachments/844266656700170261/844576474757333005/desixred-white.png')
        .setURL('https://desixred-bot.tk')
        .addField('**When can I claim**' , '> You will be able to claim your rewards from `5-7` days. This depends on the amount of the boosts and how active you are.')
        .addField('**Why that long?**' , '> Once we had "instant" perk claim , and since we rolled out that update people started scamming us. They claimed their rewards and then just leave server and boost another server.')
        .setColor('303135')
        .setThumbnail('https://cdn.discordapp.com/attachments/832618967242637352/844579000181587968/image0.gif')
        .setDescription("> Hey , I noticed that you just boosted our server. If you have questions about claiming the perks , read the text below.")
        .setImage('https://cdn.discordapp.com/attachments/844266656700170261/844574090039787591/eee1.gif')
        .setFooter('Thanks for understanding!', 'https://cdn.discordapp.com/attachments/800272249017466941/844578343319371796/tenor_1.gif')
        .setTimestamp()
               
        )
    }

}
        