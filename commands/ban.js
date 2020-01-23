const Discord = require("discord.js");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

module.exports.run = async (bot, message, args) => {

  message.delete();
  
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {msg.delete(5000)})

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.reply(Embed).then(msg => {msg.delete(5000)})
  if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**ERROR:** That user cannot be banned!").then(msg => {msg.delete(5000)})
  
  let bReason = args.join(" ").slice(22);
  if(!bReason) return message.channel.send("**ERROR:** No reason provided for banning " + (bUser)).then(msg => {msg.delete(5000)})

  let sicon = bot.user.displayAvatarURL;
  let banEmbed = new Discord.RichEmbed()
  .setTitle("User Banned!")
  .setThumbnail(sicon)
  .setColor("RANDOM")
  .addField("Banned User:", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By:", `${message.author} with ID: ${message.author.id}`)
  .addBlankField(true)
  .addField("Details", "~~                          ~~")
  .addField("Reason:", bReason)
  .setTimestamp()
  .setFooter('When');
  

  let banChannel = message.guild.channels.find(`name`, "staff-logs");
  
  if(!banChannel) return message.channel.send("Please create a channel called `staff-logs` and make sure I can send messages there!").then(msg => {msg.delete(5000)})
  
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
