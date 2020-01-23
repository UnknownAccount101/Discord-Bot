const Discord = require("discord.js");
const fs = require("fs");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply(Embed);
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: +prefix (new prefix goes here)");
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err);
  });
  
let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**Prefix Set!**", `Set to ${args[0]}`);
  
  message.channel.send(Embed1);

}

module.exports.help = {
  name: "prefix"
}