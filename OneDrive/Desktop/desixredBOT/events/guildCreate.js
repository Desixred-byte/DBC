const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('guildCreate', async guild => {
            let chan = guild.channels.cache.first()
            
            // Embed
            let embed = new MessageEmbed()
                    .setColor('303135')
                    .setURL('https://desixred-bot.tk')
                    .setAuthor(`\u200b`, client.user.displayAvatarURL())
                    .setDescription(`Your bot description here`)
                    .setFooter(`https://desixred-bot.tk | $help`)
                    .setImage('https://media.discordapp.net/attachments/779016484101161000/841921592300666920/image0.png')
                    .setTimestamp()
                    
            // If no channels, it will dm the owner.
            if(!chan) {
                    guild.owner.send(embed)
                }  else if(chan) {
                    chan.send(embed)
                }

                // Making an invite for server
                 let inv; 
                 inv = await guild.channels.cache.first().createInvite()

                // Log Channel for new servers
                const newServerChan = client.channels.cache.get('841774906110640178')

                    const secEmb = new MessageEmbed()
                        .setColor(`${guild.owner.displayHexColor}`)
                        .setAuthor(`\u200b`, client.user.displayAvatarURL())
                        .setDescription(`**New Server**
                        Guild: ${guild.name}
                        Users: ${guild.memberCount}
                        Owner: ${guild.owner.displayName}
                        Owner ID: ${guild.ownerID}
                        Invite: \`${inv.url}\``)
                        .setFooter(`Guild ID: ${guild.id}`)
                        .setTimestamp()

                    newServerChan.send(secEmb)
    })
}