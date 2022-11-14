const  axios  = require("axios");
const { SlashCommandBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const signal = await axios.get("http://localhost:4000/signal");
    console.log(signal)
    await interaction.reply(signal.json());
  },
};
