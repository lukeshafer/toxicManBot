import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { answers } from '../data/answers.json';

export default {
  data: new SlashCommandBuilder()
    .setName('question')
    .setDescription('Ask A QUesTION! :)!')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Ur QUesTIon!! 😂')
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) =>
    await interaction.reply(
      `> ${interaction.options.getString('question')} \n\n${
        answers[Math.floor(Math.random() * answers.length)]
      }`
    ),
};
