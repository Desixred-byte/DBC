const Discord = require("discord.js");

module.exports = {
  name: "drop",
  category: "giveaway",
  run: async({ message, args, client, handler }) => {
    let hasPerm = message.member.hasPermission("MANAGE_MESSAGES");

    if (hasPerm === false) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__ERROR__")
          .setColor("#FF0000")
          .setDescription(
            "You need `MANAGE_MESSAGES` permissions or a role named `giveaway` to use that command!"
          )
      );
    }

    const Embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Mention a channel or type **stop** to cancel the giveaway!"
      );
    let mainMsg = await message.channel.send(Embed);

    let error = false;
    let msg;
    await message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 20000,
        errors: ["time"],
      })
      .then((collected) => {
        msg = collected.first().content;
        collected.first().delete();
      })
      .catch((err) => {
        error = true;
        mainMsg.edit(
          new Discord.MessageEmbed()
            .setTitle("__ERROR__")
            .setColor("#FF0000")
            .setDescription(
              "You didn't mention a channel in time... So, I cancelled the giveaway!"
            )
        );
        return;
      });
    if (error) return;
    msg = msg.replace("<", "").replace("#", "").replace(">", "");
    if (msg === "stop" || msg === "cancel") {
      return message.channel.send("Drop Cancelled!");
    }
    let salon = message.guild.channels.cache.find((c) => c.id === msg);
    if (!salon) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__ERROR__")
          .setColor("#FF0000")
          .setDescription(
            "I can't find that channel. Are you sure that I can see it?"
          )
      );
    }

    const MEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Now enter the drop prize or type **stop** to cancel the giveaway!"
      );
    mainMsg.edit(MEmbed);

    error = false;
    let msg2;
    await message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 20000,
        errors: ["time"],
      })
      .then((collected) => {
        msg2 = collected.first().content;
        collected.first().delete();
      })
      .catch((err) => {
        error = true;
        mainMsg.edit(
          new Discord.MessageEmbed()
            .setTitle("__ERROR__")
            .setColor("#FF0000")
            .setDescription(
              "You didn't specify a prize in time... So, I cancelled the giveaway!"
            )
        );  // @seniorJack please fuck off
        return;
      });
    if (error) return;
    if (msg2 === "stop" || msg2 === "cancel") {
      return message.channel.send("Cancelling drop...");
    }

    const wMEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription("Drop will start in <#" + salon.id + "> in 10 seconds!");
    mainMsg.edit(wMEmbed);

    setTimeout(async () => {
      const DropEmbed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({
            format: "png",
            dynamic: "true",
          })
        )
        .setColor("BLUE")
        .setDescription(
          `First to click on \`🎉 \` will win !\n\n\`🎉 \`・Prize: **${msg2}**\n\`⏲️\`・Max duration: **30** minutes`
        )
        .setFooter("Drop by " + message.author.tag)
        .setTimestamp();
      let m = await salon.send(DropEmbed);
      m.react("🎉");
      const filtre = (reaction, user) => {
        return ["🎉"].includes(reaction.emoji.name) && !user.bot;
      };
      m.awaitReactions(filtre, {
        max: 1,
        time: 1800000,
        errors: ["time"],
      })
        .then((collected) => {
          const reaction = collected.first();
          if (reaction.emoji.name === "🎉") {
            const WinEmbed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: "true",
                })
              )
              .setColor("#FF0000")
              .setFooter("Drop by " + message.author.tag)
              .setTimestamp()
              .setDescription(
                `Congratulations <@${
                  reaction.users.cache.last().id
                }> as you were the first one to react you win the Giveaway Of __**${msg2}**__!`
              );
            m.edit(`<@${reaction.users.cache.last().id}>`, WinEmbed);
          }
        })
        .catch((collected) => {
          console.log(collected);
        });
    }, 10000);
  },
};