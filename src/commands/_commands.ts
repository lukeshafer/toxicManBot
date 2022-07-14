import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import question from './question';
import name from './name';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): any;
}

export default [question, name] as Command[];
