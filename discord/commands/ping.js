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
    await interaction.reply(
      `      ${data[0].name}/USDT 
      price: ${data[0].currentPrice}  
      entry: ${data[0].entry} 
      stopLoss: ${data[0].stopLoss} 
      Targets: ${data[0].targets[0].value} 
      ROI: ${data[0].targets[0].roi} 
      Info: ${data[0].info[0]}
      Recomended Exchange: ${data[0].availableExchanges[0]}`
    );
  },
};
