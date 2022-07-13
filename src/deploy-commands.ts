import commands from './commands/_commands';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;


const commandList = commands.map((element) => element.data);
const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commandList,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);