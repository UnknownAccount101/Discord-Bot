const Discord = require("discord.js");

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

module.exports.run = async (bot, message, args) => {
  
  message.delete()
  
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!rUser) return message.channel.send(Embed).then(msg => {msg.delete(5000)})

  let rReason = args.join(" ").slice(22);
  if(!rReason) return message.channel.send("**ERROR:** Please provide a reason in your report!").then(msg => {msg.delete(5000)})
  
  let sicon = bot.user.displayAvatarURL;
  let reportEmbed = new Discord.RichEmbed()
  
  .setTitle("User Reported!")
  .setThumbnail(sicon)
  .setColor("RANDOM")
  .addField("~~                          ~~" + "\nReported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addBlankField(true)
  .addField("Details", "~~                          ~~")
  .addField("Channel", message.channel)
  .addField("Reason", rReason)
  .setTimestamp()
  .setFooter('When')

  let reportsChannel = message.guild.channels.find(`name`, "mod-logs");
  if(!reportsChannel) return message.channel.send("**Please create a channel called `mod-logs` and make sure I can send messages there!**").then(msg => {msg.delete(10000)})
  
  reportsChannel.send(reportEmbed);
  message.reply("your bug report has been logged!").then(msg => {msg.delete(10000)});

}

module.exports.help = {
  name: "report"
}
