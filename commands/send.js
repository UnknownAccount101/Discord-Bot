const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  var argresult = args.join(' ');

  cmd = cmd.slice(prefix.length);

  var msg = message.content.toLowerCase();

  if (message.author.bot) return;

  var mention = message.mentions.users.first();

  if (msg.startsWith (prefix + "send")) {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have the proper permissions to do this!");

    if (mention == null) { return; }
    message.delete();
    var mentionMessage = message.content.slice (8);
    mention.sendMessage (mentionMessage);
    message.channel.send ("Message has been sent.");
  };

}

module.exports.help = {
  name: "send"
}
