const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "emojilist",
  description: "View all emojis in the guild",
  category: "utility",
  run: async({ message, args, client, handler }) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++; //says api erro too many message chars // i want it to send 3 embeds different so it wont get limit
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++; // u can make it normal text format insteaf of embed
        Emojis += Emoji(emoji.id);
      }
    });

    message.channel.send(`**Standard [${EmojiCount}]**:\n${Emojis}`, { split: true })
    message.channel.send(`**Animated [${Animated}]**:\n${EmojisAnimated}`, { split: true })
      //idk lol its weird wait
      let EmbedAll = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(`RANDOM`);
    message.channel.send(EmbedAll);
  },
};