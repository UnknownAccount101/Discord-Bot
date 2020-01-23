const Discord = require("discord.js");

let EmbedHeads = new Discord.RichEmbed() 

.setColor("RED")
.addField("**COINFLIP**", "Your coin landed on **HEADS!**")

let EmbedTails = new Discord.RichEmbed() 

.setColor("RED")
.addField("**COINFLIP**", "Your coin landed on **TAILS!**")

module.exports.run = async (bot, message, args) => {
  
  var chance = Math.floor(Math.random() * 2);
  if(chance == 0)
  {
    message.reply(EmbedHeads);
  }
  else
  {
    message.reply(EmbedTails);
  }
}

module.exports.help = {
  name: "coinflip"
}
