const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let pages = ['This is page one', 'This is page two', 'Third page', 'Fourth Page'];
  let page = 1;

  const Embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])

  message.channel.send(Embed).then(msg => {

    msg.react('⏪').then( r => {
      msg.react('⏩')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

      backwards.on('collect', r => {
        if (page === 1) return;
        page--;
        Embed.setDescription(pages[page-1]);
        Embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(Embed)
      })

      forwards.on('collect', r => {
        if (page === pages.length) return;
        page++;
        Embed.setDescription(pages[page-1]);
        Embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(Embed)
      })

    })

  })


}

module.exports.help = {
  name: "pages"
}
