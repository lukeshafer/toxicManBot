import { Client, Intents } from 'discord.js';
import events from './events/_events';
import 'dotenv/config';
import express from 'express';

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

events.forEach((event) => {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
    console.log(event.name);
  }
});

// Login to Discord with your client's token
client.login(token);
