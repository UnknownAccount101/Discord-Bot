const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve,ms)
  })
}

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  var argresult = args.join(' ');

  cmd = cmd.slice(prefix.length);

  if (cmd === "dm") {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(Embed1);

    message.guild.members.forEach(async member => {
      member.send(args.join(" "));
      await sleep(1000);
    });
  };

}

module.exports.help = {
  name: "dm"
}
