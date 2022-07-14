import { Message } from 'discord.js';
import { reactions } from '../data/reactions.json';

export default (message: Message) => {
  let key: keyof typeof reactions;
  // if message contains a key in reactions, send the corresponding value
  for (key in reactions) {
    if (message.content.includes(key)) {
      message.channel.send(reactions[key]);
    }
  }
};
