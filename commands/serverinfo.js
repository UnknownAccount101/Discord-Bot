const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

  if (message.content.startsWith(prefix + 'serverinfo')) {

  let sicon = bot.user.displayAvatarURL;
  let Embed = new Discord.RichEmbed()

  .setDescription("**Server Information**")
  .setColor("RANDOM")
  .setThumbnail(sicon)
  .addField("Server Name", `${message.guild.name}`)
  .addField("Server Owner", message.guild.owner.user.tag)
  .addField("Member Count", message.guild.memberCount)

  message.channel.sendMessage(Embed);

  }

}

module.exports.help = {
  name: "serverinfo"
}
