const discord = require("discord.js");
const botconfig = require("../botconfig.json");
var request = require("request");

module.exports.run = async (bot, message, args) => {
    var prefix = botconfig.prefix;
    var msg = message.content.toLowerCase();

    if (msg.startsWith(prefix + "server")) {
        if (!msg.includes(" ")) return;
        var ip = msg.replace(prefix + "server ", "");
        var url = "https://api.mcsrvstat.us/2/" + ip;
        request.get(url, {
                json: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117"
                }
            },
            function (error, response, b) {
                if (error) console.log(error);
                let reply = new discord.RichEmbed()
                    .setColor("GREEN")
                    .addField("IP", ip)
                    .addField("Players", b.players.online + "/" + b.players.max)
                    .addField("MOTD", b.motd.clean[0] + "\n" + b.motd.clean[1]);
                message.reply(reply);
            }
        );
    }

}

module.exports.help = {
    name: "server"
}