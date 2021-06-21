const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const profileModel = require("../schema/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    coins: 1000,
    bank: 0,
  });
  profile.save();
};

module.exports = async(client, member) => {
    let channel = member.guild.channels.cache.get('843083079685111819')

    let canvas = Canvas.createCanvas(1772, 633)
    let ctx = canvas.getContext('2d')
    let background = await Canvas.loadImage(`images/welcome.png`)

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#f2f2f2'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    if(member.user.username.length >= 14){
        ctx.font = 'bold 100px Genta'
        ctx.fillStyle = '#f2f2f2'
        ctx.fillText(`${member.user.username}`, 720, canvas.height / 2 + 20)
    }else{
        ctx.font = 'bold 150px Genta'
        ctx.fillStyle = '#f2f2f2'
        ctx.fillText(`${member.user.username}`, 720, canvas.height / 2 + 20)
    }

    ctx.font = 'bold 40px Genta'
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText(`#${member.user.discriminator}`, 730, canvas.height / 2 + 58)
 
    ctx.font = 'bold 60px Genta'
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 125)

    ctx.font = 'bold 60px Genta'
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText(`${member.guild.name}`, 700, canvas.height / 2 - 150)

    ctx.beginPath()
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true)//position of img
    ctx.closePath()
    ctx.clip()

    let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }))
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500)
    let attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    
    channel.send(attachment)
}