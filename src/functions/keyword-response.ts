import type { Message } from 'discord.js';
import { reactions } from '../data/reactions.json';

let lastMessage: string = '';

export default (message: Message) => {
	let key: keyof typeof reactions;
	// if message contains a key in reactions, send the corresponding value
	const newMsg = message.content.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
	for (key in reactions) {
		if (newMsg.includes(key)) {
			if (key === lastMessage) return false;
			message.channel.send(reactions[key]);
			lastMessage = key;
			return true;
		}
	}
	return false;
};
