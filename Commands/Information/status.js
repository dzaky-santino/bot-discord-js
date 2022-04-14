const { MessageEmbed, CommandInteraction, Client, version } = require("discord.js");
const os                                                    = require("os");
const moment                                                = require("moment");
require('moment/locale/id')

module.exports = {
    name: "status",
    description: "Client And Database Status.",
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
            .setTitle(`<a:Announcement:949681977412423680> ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(interaction.client.application.description || "")
            .addFields(
                { name: "🧠 Client", value: client.user.tag, inline: true },
                { name: "<:CreatedAt:949128848644145153> Created", value: `${moment(client.user.createdTimestamp).format("Do MMMM YYYY")}`, inline: true },
                { name: "<:Blurple_Verified:882539172697632779> Verified", value: client.user.flags.has("VERIFIED_BOT") ? "Yes" : "No", inline: true },
                { name: "👩🏻‍💻 Owner", value: `${interaction.client.application.owner.tag || "None"}`, inline: true },
                { name: "💾 Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
                { name: "🖥 System", value: os.type().includes("Windows") ? "Windows" : os.type(), inline: true },
                { name: "<:NodeJS:949128925290831872> Node.js", value: process.version, inline: true },
                { name: "<:discord:803154690288123925> Discord.js", value: version, inline: true },
                { name: "⏲️ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
                { name: "<:Ping:949128981305782282> Ping", value: `${client.ws.ping}ms`, inline: true },
                { name: "<:Command:949128848556064779> Commands", value: `${client.commands.size}`, inline: true },
                { name: "<a:server_poll:876132876184342558> Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "<:Members:949128925521530940> Users", value: `${client.users.cache.size}`, inline: true },
                { name: "<:Channels:949128848740606002> Channels", value: `${client.channels.cache.filter((channel) => channel.type !== "GUILD_CATEGORY").size}`, inline: true }
            );
        interaction.reply({ embeds: [embed]});
    }
}