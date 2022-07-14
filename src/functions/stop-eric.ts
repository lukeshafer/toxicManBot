import { Message } from 'discord.js';

export default (message: Message) => {
  if (message.author.id === '757783143997636658') {
    const reply = stopEric(message.content);
    if (reply) {
      message.reply(reply);
    }
  }
};

const stopEric = (msgText: string) => {
  let newMsg = msgText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const checkStrings = [
    'viet',
    'nam',
    'tnma',
    'veit',
    'morningv',
    'tman',
    'afternoonv',
    'teiv',
    'tiev',
    'manteiv',
    'namt',
    'maidin',
    'mhaith',
    'gmv',
  ];
  const didHeSayIt = checkStrings.some((check) => {
    return newMsg.includes(check) || msgText.includes('🇻🇳');
  });

  const responses = [
    'HCCH!!',
    'ERICCHH!!! NO !',
    'DO NOT! ! DO IT',
    'HCCH HCCH HCCH!!!!!! :(',
    'HHHHHHHCHCHCCCCC NO ERIC NOH! NO!',
    'i WIL PEriSH!!!',
    'laRGE fathre RANDLE,,NOH!',
  ];

  return didHeSayIt
    ? responses[Math.floor(Math.random() * responses.length)]
    : '';
};
