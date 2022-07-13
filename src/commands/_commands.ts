import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ping from './ping.js';
import user from './user.js';
import server from './server.js';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): any;
}

export default [ping, user, server] as Command[];