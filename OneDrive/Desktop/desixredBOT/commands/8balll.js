const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'event',
  category: "fun",
  description: 'Asks a question and let the bot determine your fate!',
  Usage: "8ball < your question here >",
  run: async({ message, args, client, handler }) => {
    message.channel.send(new MessageEmbed()
    .setTitle('**Desixred Inviting Perks**')
    .setDescription('Win many rewards just for inviting our official moderation bot , Desixred.')
    .addField('**Whats this?**' , 'Basically , just by adding our Desixred bot to your server , you can earn Nitro/Giftcard!')
    .addField('**What are the requirements?**', 'The requirements are simple , you must have at least 10 members in your server!')
    .addField('**Rewards for Guilds**','Here are the rewards!')
    .addField('Server more than 25 people' ,'Custom role' ,true)
    .addField('Server more than 90 people' ,'Nitro classic', true)
    .addField('Server more than 150 people' , 'Nitro classic 2 months',true)
    .addField('Server more than 250 people' ,'Nitro boost 10$', true) 
    .addField('Server more than 500 people' , 'Nitro boost 3 months', true)
    .addField('Server more than 1k members','Nitro classic 50$', true)
    .addField('Server more than 2k','Nitro boost 100$', true)
    .addField('**Will it raid/nuke my server?**','No of course , My main account Desixred got disabled and so we can not use our main bot which was verified , Just use the prefix help to get all the commands!', true)
    .addField('**Bot Invite link?**','[**Add the bot to your server**](https://discord.com/api/oauth2/authorize?client_id=830461569233977377&permissions=4294967287&scope=bot%20applications.commands)')
    )
  }
}

