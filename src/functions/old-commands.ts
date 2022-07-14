import { Message } from 'discord.js';

export default (message: Message) => {
  // if message starts with !, respond
  if (message.content.substring(0, 1) === '!') {
    // Commands starting with !
    // console.log(evt);
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];
    if (['question', 'ask', 'name'].includes(cmd)) {
      message.reply('HCHCCH! use SLash Comand! :angry:');
    }
  }
};
