const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

  if (message.content.startsWith(prefix + 'botinfo')) {

  let sicon = bot.user.displayAvatarURL;
  let Embed = new Discord.RichEmbed()

  .setDescription("**Bot Information**")
  .setColor("RANDOM")
  .setThumbnail(sicon)
  .addField("Bot Name", bot.user.username)
  .addField("Bot Created At", bot.user.createdAT)
  .addField("Discord Servers", bot.guilds.size)

  message.channel.sendMessage(Embed);

  }

}

module.exports.help = {
  name: "botinfo"
}
