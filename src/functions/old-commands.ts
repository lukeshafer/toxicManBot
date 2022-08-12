import type { Message } from 'discord.js';
import { answers } from '../data/answers.json';
import { names_1, names_2, names_3, names_4 } from '../data/names.json';

export default (message: Message) => {
	// if message starts with !, respond
	if (message.content.substring(0, 1) === '!') {
		// Commands starting with !
		// console.log(evt);
		var args = message.content.substring(1).split(' ');
		var cmd = args[0];
		switch (cmd) {
			case 'question':
				if (args.length === 1) message.reply('ask A QUWestION!!!! > : (((');
				else message.reply(answers[Math.floor(Math.random() * answers.length)]);
				break;
			case 'name':
				var name_1 = names_1[Math.floor(Math.random() * names_1.length)];
				var name_2 = names_2[Math.floor(Math.random() * names_2.length)];
				var name_3 = names_3[Math.floor(Math.random() * names_3.length)];
				var name_4 = '';
				// 10% chance of getting a name from the 4th list
				if (Math.random() < 0.1) {
					name_4 = names_4[Math.floor(Math.random() * names_4.length)];
				}

				message.reply(name_1 + name_2 + name_3 + name_4);
				break;
			default:
				break;
		}
	}
};
