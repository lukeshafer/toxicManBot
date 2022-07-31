import type { Message } from 'discord.js';
import { toxicResponses } from '../data/toxic-responses.json';
import getSpecialResponse from './special-response';

export default (message: Message) => {
	if (message.mentions.has(process.env.CLIENT_ID)) {
		console.log(`${message.author.tag} mentioned me!`);
		message.channel.send(getToxicResponse(message.author.id));
	}
};

export const getToxicResponse = (userID: string) => {
	console.log('Generating toxic response...');
	// create reply with random toxic response
	const reply =
		toxicResponses[Math.floor(Math.random() * toxicResponses.length)];

	// get special response if applicable
	const specialResponse = getSpecialResponse(userID);
	// 10% chance of reply being the special response
	if (specialResponse && Math.random() < 0.1) {
		return specialResponse;
	}
	return reply;
};
