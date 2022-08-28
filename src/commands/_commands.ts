import type { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import question from './question';
import name from './name';
import fieri from './fieri';

export interface Command {
	data: SlashCommandBuilder;
	execute(interaction: CommandInteraction): any;
}

export default [question, name, fieri] as Command[];
