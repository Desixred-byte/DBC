const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'apply',
    cooldown: '5m',
    dmOnly: 'false',
    category: "Applications", 
    run: async({ message, args, client, handler }) => {
        message.reply('Check your DMs , We will start the application in your DMs!');
        const questions = [
            'What is your discord username and ID? (Search google on how to get ID.)',
            'How long have you been in our server? Do ?userinfo , you will see.',
            'Will you assist everyone who needs support?',
            'Do you understand that you must be active?',
            'Why do you want to be staff?',
            'Why should we choose you over others? (Use grammar)',
            'How active are you? (1-10)',
            'Now we will roleplay? Are you ready?',
            'If someone is fighting , what do **you** do?',
            'Someone is spamming in general chat , what do **you** do?',
            'Do you own a server? (Say no if you dont.)',
            'If you own a server please give us the links.',
            'Do you agree to staff rules? You can do `;staffrules`.',
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = m => m.author.id === message.author.id;
        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;
        

        const collector = channel.createMessageCollector(filter);

        collector.on('collect', () => {
            if (collectCounter < questions.length) {
                channel.send(questions[collectCounter++]);
            } else {
                channel.send(`Thanks for applying , desixred will check your application soon. (You will get dm from me if you get accepted.)`);
                collector.stop('fulfilled');
            }
        });
        const appChannel = client.channels.cache.get('843193636066033754');  //
        collector.on('end', (collected, reason) => {
            if (reason === 'fulfilled') {
                let index = 1; //make it so I can set the log channel with cmd
                const mapped = collected
                    .map(msg => {
                        return `**${index++})** | ${questions[endCounter++]}\n-> ${
                            msg.content
                        }`;
                    })
                    .join('\n\n');
                appChannel.send(
                    new MessageEmbed().setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                    ).setTitle`New Staff Application!`
                        .setDescription(mapped)
                        .setColor('BLUE')
                        .setTimestamp()
                );
            }
        });
    }
};
