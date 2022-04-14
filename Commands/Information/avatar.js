const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Membuka Avatar",
    usage: "/avatar",
    options: [
        {
            name: "target",
            type: "USER",
            description: "Membuka Avatar User",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setColor("RANDOM")
        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
        .setDescription(`[Png](${user.avatarURL({format: 'png'})}) | [webp](${user.avatarURL({dynamic: true})}) | [Jpg](${user.avatarURL({format: 'jpg'})})`)
        .setFooter({text: `Member ID: ${user.id}`});

        interaction.reply({embeds: [embed]})
    },
}
