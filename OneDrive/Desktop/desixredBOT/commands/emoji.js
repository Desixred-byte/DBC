const Discord = require("discord.js");


module.exports = {
  name: `emojiinfo`,
  cooldown: 2,
  category: "Info",
  run: async({ message, args, client, handler }) => {

    if (!args[0]) return message.reply('Please type a valid emoji or an emoji ID.')

  
    let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0] || emoji.id === args[0] || emoji == args[0].replace(/([^\d])+/gim, ''));

    if (!emoji) return message.reply('Invalid emoji!')

  let a = null

  let x = "`"



  let galaxy;
  let link;

  let name = emoji.name

  let id = emoji.id

  let link1 = `https://cdn.discordapp.com/emojis/${id}`

  if (emoji.animated === true) {
    galaxy = `<a:${name}:${emoji.id}>`
    link = link1 + ".gif"
  } else {
    galaxy = `<:${name}:${emoji.id}>`
    link = link1 + ".png"
  }

  let mention = galaxy



 


  const b =  new Discord.MessageEmbed()
  .setTitle(`Emoji info!`)
  .setThumbnail(link)
  .addFields(
    
      {name: "Emoji:", value: emoji, inline: false},
      {name: "Mention:", value: x + mention + x, inline: false},
      {name: "Name:", value: x + name + x, inline: true},
      {name: "Id:", value: x + id + x, inline: true},
      {name: "Animated:", value: emoji.animated ? "Animated" : "Not Animated", inline: false}
  )

  //adding fields


b.setURL(link)
b.setColor('BLACK')
  message.channel.send(b)


}}