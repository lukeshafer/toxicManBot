import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  execute: async (interaction: CommandInteraction) =>
    await interaction.reply(
      `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
    ),
};