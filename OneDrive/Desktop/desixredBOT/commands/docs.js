const fetch = require('node-fetch')

module.exports = {
    name: 'docs',
    run: async({ message, args }) => {
        let query = args.join(' ')
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`

		let docFetch = await fetch(url)
		let embed = await docFetch.json()

		if(!embed || embed.error) return message.channel.send('I can\'t find it in the [documentation](https://discord.js.org/).')

		let msg = await message.channel.send({ embed })
		await msg.react('🗑')

		let react
		try{
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name == '🗑' && user.id == message.author.id, 
				{ max: 1, time: 10000, errors: ['time'] }
			)
		}catch(error){
			msg.reactions.removeAll()
		}

		if(react && react.first()) msg.delete()
		return message
    }
}