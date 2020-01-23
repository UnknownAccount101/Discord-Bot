const Discord = require("discord.js");

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {

  message.delete();
  
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(Embed1).then(msg => {msg.delete(5000)})  
  
  let botmessage = args.join(" ");
  if(!botmessage) return message.channel.send("**ERROR:** You did not type a message!").then(msg => {msg.delete(5000)})

  message.channel.send(botmessage);
}

module.exports.help = {
  name: "say"
}
