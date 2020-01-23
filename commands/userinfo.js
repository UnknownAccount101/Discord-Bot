const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  var user;
    if(message.mentions.users.first()) user = message.mentions.users.first();
    else user = message.author;

  const Member = message.guild.member(user);

  let sicon = bot.user.displayAvatarURL;
  let Embed = new Discord.RichEmbed()

  .setTitle(`${user.username}#${user.discriminator}`)
  .setColor("RANDOM")
  .setThumbnail(sicon)
  .addField("Nickname:", `${Member.nickname !== null ? `${Member.nickname}` : 'None'}`)
  .addField("Bot:", `${user.bot}`)
  .addField("Status:", `${user.presence.status}`)
  .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`)
  .addField("Roles:", Member.roles.map(roles => `${roles.name}`).join(', '))

  message.channel.sendMessage(Embed);

}

module.exports.help = {
  name: "userinfo"
}
