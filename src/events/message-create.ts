import type { Message } from 'discord.js';
import checkIfMentioned from '../functions/toxic-response';
import checkIfEricNeedsToBeStopped from '../functions/stop-eric';
import checkIfContainsKeyword from '../functions/keyword-response';
import checkIfOldCommand from '../functions/old-commands';
import goodmorning from '../functions/goodmorning';

// Event is called when a message is sent in the server
export default {
	name: 'messageCreate',
	execute(message: Message) {
		// Send toxic response if Toxic Man is mentioned
		checkIfMentioned(message);

		// Stop Eric's nonsense 😡
		if (!checkIfEricNeedsToBeStopped(message))
			if (!goodmorning(message)) checkIfContainsKeyword(message);
		// Respond if message contains a keywork from reactions.json

		// Check if user is using old ! command
		checkIfOldCommand(message);
	},
};
