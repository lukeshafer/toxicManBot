import type { Message } from 'discord.js';

let morning = true;

export default (message: Message) => {
	// if message contains a key in reactions, send the corresponding value
	const newMsg = message.content.replace(/[^a-zA-Z0-9]/g, '');
	const lowerCaseMsg = newMsg.toLowerCase();
	if (lowerCaseMsg.includes('goodmorning') && morning) {
		message.channel.send(getResponse(message));
		morning = false;
		// set timeout for six hours, then morning will be false
		setTimeout(() => (morning = true), 21600000);
		return true;
	}
	return false;
};

const getResponse = (message: Message) => {
	const responses = [
		'IS It/?? !',
		'itS NOt MORNng! :)',
		'hhhhhheee good Toxic morNIng (: . !',
		'hhhhhheeeeeeeee',
		'Or BAD mornING! HAH HAH>!! ',
		'ok???????? :rofl:',
		'OH NO itS MOrning ALREADY??? ',
		'hhhHHHhhEEE ! ! good NIGHT!',
		`Hhhhheeeelllo ${message.author.username}!!! >:o`,
		'hhhhhhhhheeeeee',
	];

	return responses[Math.floor(Math.random() * responses.length)];
};
