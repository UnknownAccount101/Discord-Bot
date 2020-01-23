const Discord = require("discord.js");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {
  
    message.delete();

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!tomute) return message.reply(Embed).then(msg => {msg.delete(5000)})    
        
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(Embed1).then(msg => {msg.delete(5000)})

    let muterole = message.guild.roles.find("name", "Muted");
    if (!muterole) return message.reply("Please make a role called `Muted`!")
  
    tomute.removeRole(muterole.id);
      
    message.channel.send(`**<@${tomute.id}> has been unmuted!**`).then(msg => {msg.delete(10000)})
}

module.exports.help = {
  name: "unmute"
}
