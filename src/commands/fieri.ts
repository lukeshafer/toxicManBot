import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import fieri from '../data/fieri.json';

export default {
	data: new SlashCommandBuilder()
		.setName('fieri')
		.setDescription('see a Pictuer !of My Good Friend!!'),
	execute: async (interaction: CommandInteraction) =>
		await interaction.reply(fieri[Math.floor(Math.random() * fieri.length)]),
};
