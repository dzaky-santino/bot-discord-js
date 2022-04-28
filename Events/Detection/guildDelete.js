const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildDelete',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const guild = interaction;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Bot Meninggalkan Server")
        .setDescription(`${client.user.tag} Telah Pergi Dari Server.`)
        .setFields(
            {name: "Nama Server:", value: `${guild.name}`, inline: true},
            {name: "Member Server:", value: `${guild.memberCount}`, inline: true},
            {name: "Total Server", value: `${client.guilds.cache.size}`},
            {name: "Total Users", value: `${client.users.cache.size}`}
        )
        .setTimestamp();
        
        const logC = client.channels.cache.get("947186218041503864")

        logC.send({ embeds: [embed] })
    },
};