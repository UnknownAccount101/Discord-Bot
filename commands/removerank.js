const Discord = require("discord.js");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")
      
let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")
    
let Embed2 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "Please specify a role!")
          
let Embed3 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "Rank does not exist! Please create it and try again!")
          
let Embed4 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "The user specified does not have that rank!")
          
module.exports.run = async (bot, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(Embed).then(msg => {msg.delete(5000)})  
  
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply(Embed1);
  let role = args.join(" ").slice(22);
  if(!role) return message.reply(Embed2);
  let gRole = message.guild.roles.find("name", role);
  if(!gRole) return message.reply(Embed3);
  
  if(!rMember.roles.has(gRole.id)) return message.reply(Embed4);
  await(rMember.removeRole(gRole.id));
  
  try {
    await rMember.send(`You have been removed from the ${gRole.name} rank!`)
  } catch(e) {
    message.channel.send(`<@${rMember.id}>, has been removed from the ${gRole.name} rank!`)
  }
}

module.exports.help = {
  name: "removerank"
}