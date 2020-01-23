const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {

  var argresult = args.join(' ');

  if (message.content.startsWith(prefix + 'setstatus')) {
    if (!argresult) argresult = 'online'
    bot.user.setStatus(argresult);

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(Embed1);

  }

}

module.exports.help = {
  name: "setstatus"
}
