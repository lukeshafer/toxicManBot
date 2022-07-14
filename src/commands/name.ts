import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { names_1, names_2, names_3, names_4 } from '../data/names.json';

export default {
  data: new SlashCommandBuilder()
    .setName('name')
    .setDescription('i wil Giv you a name, foR yur Next CHild !! :)'),
  execute: async (interaction: CommandInteraction) => {
    var name_1 = names_1[Math.floor(Math.random() * names_1.length)];
    var name_2 = names_2[Math.floor(Math.random() * names_2.length)];
    var name_3 = names_3[Math.floor(Math.random() * names_3.length)];
    var name_4 = '';
    // 10% chance of getting a name from the 4th list
    if (Math.random() < 0.1) {
      name_4 = names_4[Math.floor(Math.random() * names_4.length)];
    }

    await interaction.reply(name_1 + name_2 + name_3 + name_4);
  },
};
