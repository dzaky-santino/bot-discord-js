const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "guilds",
    description: "Showing Servers That Have This Bot",
    usage: "/guilds",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle('Guilds')
        .setDescription(`**Total Guilds**: \`${client.guilds.cache.size}\`\n**Total Guilds Names**: \`${client.guilds.cache.map(g => g.name).join(', ')}\``)
        .setFooter({text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.member.user.displayAvatarURL()})
        .setTimestamp()

        interaction.reply({embeds: [Response], ephermeral: true});
    }
}