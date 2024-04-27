// // using package nodemon for developing
import dotenv from "dotenv";
dotenv.config();

import {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  ChannelType,
} from "discord.js";
import sendMessageData from "./postannouncement.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}


client.on("ready", (c) => {
  console.log(`the bot ${c.user.id} is ready`); 
});

client.on('messageCreate', async message => {
  
  // Log detailed information about the message
  console.log(`Received message from ${message.author.tag} in channel ${message.channel.name} (${message.channel.type}) of guild ${message.guild.name} (${message.guild.id})`);
  console.log(`Message content: ${message.content}`);
  console.log(`Message ID: ${message.id}, Channel ID: ${message.channel.id}, Author ID: ${message.author.id}`);
  console.log(`Created at: ${message.createdAt}, Edited at: ${message.editedAt || 'Not Edited'}`);



  // Check if the message is from an announcement channel or the channel name contains 'announcements' or 'announcement'
  if (message.channel.type === ChannelType.GuildAnnouncement || message.channel.name.toLowerCase().includes('announcement')) {
    // Prepare the data to send
    console.log("sending message");
    const messageData = {
      author: message.author.username,
      content: message.content,
      guildId: message.guild.id,
      guildName: message.guild.name,
      channelName: message.channel.name,
      timestamp: message.createdTimestamp
    };
    sendMessageData(messageData)
      .then(response => console.log(response.message))
      .catch(error => console.error(error));
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
