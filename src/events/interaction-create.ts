import { Interaction } from 'discord.js';
import commands from '../commands/_commands.js';

export default {
  name: 'interactionCreate',
  async execute(interaction: Interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    const command = commands.find(
      (command) => command.data.name === commandName
    );
    if (!command) return;

    try {
      await command.execute(interaction);
      console.log(`Replied to command "${commandName}"`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};