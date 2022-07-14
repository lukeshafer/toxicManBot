import { Client, Intents } from 'discord.js';
import events from './events/_events';
import 'dotenv/config';
import express from 'express';

const token = process.env.DISCORD_TOKEN;

const myIntents = new Intents();
myIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGES
);

// Create a new client instance
const client = new Client({ intents: myIntents });

events.forEach((event) => {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => {
      event.execute(...args);
    });
  }
});

// Login to Discord with your client's token
client.login(token);
