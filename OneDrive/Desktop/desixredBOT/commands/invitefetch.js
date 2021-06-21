module.exports = {
	name: "Invitess",
	description:
		"This command will list the top 10 of the users who have created invites and how many people they have invited.",
	category: "Moderation",
	commands: "invites",
	guildOnly: true,

	callback: ({ message }) => {
		const { guild } = message

		guild.fetchInvites().then((invites) => {
			const inviteCounter = {}

			invites.forEach((invite) => {
				const { uses, inviter } = invite
				const { username, discriminator } = inviter

				const name = `${username}#${discriminator}`

				inviteCounter[name] = (inviteCounter[name] || 0) + uses
			})

			let replyText = "**Invites on **Desixred bot**:**"

			const sortedInvites = Object.keys(inviteCounter).sort(
				(a, b) => inviteCounter[b] - inviteCounter[a]
			)

			var sortedInvitesLength = 0

			if (Object.keys(sortedInvites).length > 10) {
				sortedInvitesLength = 22
			} else if (Object.keys(sortedInvites).length == 0) {
				replyText = null
			} else {
				sortedInvitesLength = Object.keys(sortedInvites).length
			}

			sortedInvites.length = sortedInvitesLength

			for (const invite of sortedInvites) {
				const count = inviteCounter[invite]
				replyText += `\n${invite} has invited ${count} member(s)!`
			}

			if (replyText !== null) {
				message.channel.send(replyText)
			} else {
				message.channel.send("No invites have been made yet.")
			}
		})
	},
}