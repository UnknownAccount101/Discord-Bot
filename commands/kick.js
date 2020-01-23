const Discord = require("discord.js");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {

    message.delete();  
  
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(Embed).then(msg => {msg.delete(5000)})
      
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(Embed1).then(msg => {msg.delete(5000)})
    
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**ERROR:** That user cannot be kicked!").then(msg => {msg.delete(5000)})
  
    if(!kReason) return message.channel.send("**ERROR:** No reason provided for kicking **" + (kUser)).then(msg => {msg.delete(5000)})

    let sicon = bot.user.displayAvatarURL;
    let kickEmbed = new Discord.RichEmbed()
    .setTitle("User Kicked!")
    .setThumbnail(sicon)
    .setColor("RANDOM")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "staff-logs");
    
    if(!kickChannel) return message.channel.send("**ERROR:** Please create a channel called `staff-logs` and make sure I can send messages there!")
      .then(msg => {
      msg.delete(10000)
    })

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
}

module.exports.help = {
  name: "kick"
}
