const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "premium",
    category: "Premium Version",
    run: async({ message, args, client, handler }) => {
        const user = message.author.id
        const guild = client.guilds.cache.get('792278876641558538')
        const guildMember = await guild.members.fetch(user)
        if (
            guildMember.roles.cache.has("828953141109063703") || //Server Booster-+
            guildMember.roles.cache.has("810914126222196762") || //Server Booster-+
            guildMember.roles.cache.has("814207335157071902") // Premium Role
            
          ) {
            // Code if Premium Member
            let IPEmbed = new MessageEmbed()
            .setTitle("Premium Check")
            .setColor('BLUE')
            .addFields(
                {name: "**Premium Member Check!**", value:`Premium Checked!`, inline: false},
                {name: "**Premium:**", value:`Premium Member, invite the [**Premium bot**](https://discord.gg/desixred) to claim your premium benefits!`, inline: false}
            )
            message.channel.send(IPEmbed)
          } else {
            // Code if not Premium Member
            let NPEmbed = new MessageEmbed()
        .setTitle("Premium Check")
        .setColor('D4AF37')
        .addFields(
            {name: "**Premium Member Check!**", value:`Premium Checked!`, inline: false},
            {name: "**Premium:**", value:`Not a Premium Member.`, inline: false},
            {name: "Premium Member?", value:`Join our Support Server for Premium benifits!`}
        )
        message.channel.send(NPEmbed)
          }
    }
}