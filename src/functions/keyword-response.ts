import type { Message } from 'discord.js';
import { reactions } from '../data/reactions.json';

let lastMessageSent: string = '';

export default async (message: Message) => {
	const user = message.author.id;
	type ReactionKeyword = keyof typeof reactions;
	// if message contains a key in reactions, send the corresponding value
	const newMsg = message.content.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
	const responses = Object.entries(reactions).filter(([key, value]) => (newMsg.includes(key) && !(value === lastMessageSent && user === message.client.user?.id))) as [ReactionKeyword, string][];

	if (responses.length > 0) {
		const [, messageText] = responses[0]
		message.channel.send(messageText);
		lastMessageSent = messageText;
		return true;
	}

	return false;
};
