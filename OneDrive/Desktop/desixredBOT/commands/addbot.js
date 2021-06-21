module.exports = class SetAdminRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setadminrole',
      aliases: ['setar', 'sar'],
      usage: 'setadminrole <role mention/ID>',
      description: 'Sets the `admin role` for your server. Provide no role to clear the current `admin role`.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setadminrole @Admin']
    });
  }
  run(message, args) {
      
const Discord = require('discord.js');
const txtgen = require('txtgen');
const { FastType } = require('weky');
module.exports = {
	name: 'fasttype',
	aliases: ['speedcheck', 'fast-type', 'typefast'],
	description: 'Start a fast type game',
	usage: '',
	run: async (client, message, args) => {
		const game = new FastType({
			message: message,
			winMessage: 'Congrats guess you won!', //message sent when user types perfectly
			sentence: txtgen.sentence(), //sentence-to-be-typed
			loseMessage: 'Aw man, you suck at this you Lose!', //message sent when user misspell it
			time: 50000,
			startMessage: 'type out the words given below'
		});
		game.start();
  }
}
  }