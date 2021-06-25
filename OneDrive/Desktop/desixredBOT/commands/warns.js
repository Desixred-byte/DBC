const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { MessageEmbed } = require("discord.js");
const { prompt } = require("nekoyasui"); //npm install nekoyasui@latest

module.exports = {
    name: "codehelp",
    category: "course",
    aliases: ["helpcode"],
    cooldown: 4,
    description: "Helps with coding",
    run: async (client, message, args, cmduser, text, prefix) => {


const ask = {
  title: "OKay, first of all, what do you want to be the embed's title? Type the title into the chat now!",
  desc: "Type the description that you want in the embed!",
  color: "Type the color you want to be on the embed! It can be a color like red or a hex code.",
  footer: "What do you want its footer to be?",
  note: "To cancel the command type: `cancel` | To skip the question type: `skip`"
};

var answer = {};
answer.cancel = "ok! cancelling the embed..";
answer.skip = "skipping the question, proceed to the next question.";

answer.title = await prompt.reply(message.channel, ask.title + "\n" + ask.note, { userID: message.author.id });
if (answer.title === "skip") {
  const skip = await message.channel.send(answer.skip);
  setTimeout(async () => { await skip.delete(); }, 9e3);
}
if (!answer.title || answer.title === "cancel") return message.channel.send(answer.cancel);

answer.desc = await prompt.reply(message.channel, ask.desc + "\n" + ask.note, { userID: message.author.id });
if (answer.desc === "skip") {
  const skip = await message.channel.send(answer.skip);
  setTimeout(async () => { await skip.delete(); }, 9e3);
}
if (!answer.desc || answer.desc === "cancel") return message.channel.send(answer.cancel);

answer.color = await prompt.reply(message.channel, ask.color + "\n" + ask.note, { userID: message.author.id });
if (answer.color === "skip") {
  const skip = await message.channel.send(answer.skip);
  setTimeout(async () => { await skip.delete(); }, 9e3);
}
if (!answer.color || answer.color === "cancel") return message.channel.send(answer.cancel);

answer.footer = await prompt.reply(message.channel, ask.footer + "\n" + ask.note, { userID: message.author.id });
if (answer.footer === "skip") {
  const skip = await message.channel.send(answer.skip);
  setTimeout(async () => { await skip.delete(); }, 9e3);
}
if (!answer.footer || answer.footer === "cancel") return message.channel.send(answer.cancel);

const embed = new MessageEmbed();
if (answer.title !== "skip") embed.setTitle(answer.title);
if (answer.desc !== "skip") embed.setDescription(answer.desc);
if (answer.color !== "skip") embed.setColor(answer.color);
if (answer.footer !== "skip") embed.setFooter(answer.footer);

return message.channel.send("", { embed : embed })

}
}
