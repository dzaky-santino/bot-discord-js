const { MessageEmbed, CommandInteraction, Client, version } = require("discord.js");
const os                                                    = require("os");
const moment                                                = require("moment");
require('moment/locale/id')

module.exports = {
    name: "status",
    description: "Displays Client And Database Status",
    permission: "SEND_MESSAGES",
    usage: "/status",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await client.user.fetch();
        await client.application.fetch();

        const status = [
            "<a:DND:878111989174509588> **Disconnected**",
            "<a:READY_ONLINE:878112073341616158> **Connected**",
            "<a:IDLE:878112017658032148> **Connecting**",
            "Disconnecting"
        ];
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`📢 ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(interaction.client.application.description || "")
            .addFields(
                { name: "🧠 Client", value: client.user.tag, inline: true },
                { name: "<:icons_calendar1:941679946760351794> Created", value: `${moment(client.user.createdTimestamp).format("Do MMMM YYYY")}`, inline: true },
                { name: "<:Blurple_Verified:882539172697632779> Verified", value: client.user.flags.has("VERIFIED_BOT") ? "Yes" : "No", inline: true },
                { name: "👩🏻‍💻 Owner", value: `${interaction.client.application.owner.tag || "None"}`, inline: true },
                { name: "💾 Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
                { name: "🖥 System", value: os.type().includes("Windows") ? "Windows" : os.type(), inline: true },
                { name: "<:NODEJS:984769625227145226> Node.js", value: process.version, inline: true },
                { name: "<:discord:803154690288123925> Discord.js", value: version, inline: true },
                { name: "⏲️ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
                { name: "<:icons_goodping:880113406915538995> Ping", value: `${client.ws.ping}ms`, inline: true },
                { name: "<:icons_splash:859426808461525044> Commands", value: `${client.commands.size}`, inline: true },
                { name: "<:icons_colorserverpartner:869529747447746600> Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "<:icons_people:964425853930995783> Users", value: `${client.users.cache.size}`, inline: true },
                { name: "<:icons_channel:859424401950113822> Channels", value: `${client.channels.cache.filter((channel) => channel.type !== "GUILD_CATEGORY").size}`, inline: true }
            );
        interaction.reply({ embeds: [embed]});
    }
}