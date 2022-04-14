const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "banner",
    description: "Membuka Banner User",
    usage: "/banner",
    options: [
        {
            name: "target",
            description: "Pilih Target",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();
        
        const response = new MessageEmbed()
            .setColor(target.user.accentColor || "RANDOM")
            .setAuthor({name: target.user.tag, iconURL: target.user.avatarURL({dynamic: true})})
            .setImage(target.user.bannerURL({dynamic: true, size: 512}) || "")
            
        interaction.reply({embeds: [response], ephemeral: false})
    }
}