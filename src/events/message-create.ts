import { Message } from 'discord.js';

export default {
  name: 'messageCreate',
  execute(message: Message) {
		console.log(`Message from ${message.author.tag}: ${message.content}`);
		// respond if message mentions this bot
    if (message.mentions.has(process.env.CLIENT_ID)) {
			console.log(`${message.author.tag} mentioned me!`);
			message.channel.send(`Hello ${message.author}!`);
		}
  },
};
