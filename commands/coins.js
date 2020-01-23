const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  
  if (!coins[message.author.id]) {
    coins[message.author.id] = {
       coins: 0
    };
  }
  
  let uCoins = coins[message.author.id].coins;
  
  let Embed = new Discord.RichEmbed()
  
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("💸", uCoins);
  
  message.channel.sendMessage(Embed);
  
}

module.exports.help = {
  name: "coins"
}