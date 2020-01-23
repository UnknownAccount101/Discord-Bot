const Discord = require("discord.js");

var diceRoll = Math.floor(Math.random() * 6) + 1;

let Embed2 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**DICEROLL**", "Work in progress")

module.exports.run = async (bot, message, args) => {
  
  message.reply(Embed2);
//   message.reply("Your dice landed on " + diceRoll);
}

module.exports.help = {
  name: "diceroll"
}
