const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
   const getSignal = async () => {
     const res = await fetch(
       "http://localhost:4000/signal"
     );
     const data = await res.json();
     
     return data
   };
    const data= await getSignal();
    console.log(data);
    await interaction.reply(
      `${data[0].name} ${data[0].currentPrice}  ${data[0].entry} ${data[0].stopLoss} ${data[0].targets[0].value} ${data[0].targets[0].roi} ${data[0].info[0]} ${data[0].availableExchanges[0]}`
    );
  },
};
