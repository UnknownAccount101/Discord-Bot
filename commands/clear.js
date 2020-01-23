const Discord = require("discord.js");

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {
  
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(Embed1).then(msg => {msg.delete(5000)})  
  if(!args[0]) return message.channel.send("**ERROR:** Please add a specific amount that you want to delete.");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send('Cleared **' + args[0] + '** messages.').then(msg => msg.delete(5000));


  });
}

module.exports.help = {
  name: "clear"
}