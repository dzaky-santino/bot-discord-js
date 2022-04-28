const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildCreate',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const guild = interaction;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Bot Rumah Kedua Join Server Baru")
        .setDescription(`${client.user.tag} Telah Ditambahkan Ke Server Baru.`)
        .setFields(
            {name: "Nama Server:", value: `${guild.name}`, inline: true},
            {name: "Member Server:", value: `${guild.memberCount}`, inline: true},
            {name: "Total Server", value: `${client.guilds.cache.size}`},
            {name: "Total Users", value: `${client.users.cache.size}`}
        )
        .setTimestamp();

        const logC = client.channels.cache.get("947186218041503864")

        logC.send({ embeds: [embed] })

        const channel = guild.channels.cache.find(
            (c) =>
            c.type === "GUILD_TEXT" &&
            c.permissionsFor(guild.me).has("SEND_MESSAGES")
        );

        await channel.send({ content: `**Hai! Terima Kasih Telah Mengundang Saya!**` });
    },
};