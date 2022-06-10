const { CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");
require('moment/locale/id')

module.exports = {
    name: "user-info",
    description: "Displaying User Info",
    permission: "SEND_MESSAGES",
    usage: "/userinfo",
    options: [
        {
            name: "target",
            description: "Select the target.",
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
            .setThumbnail(target.user.avatarURL({dynamic: true}))
            .setImage(target.user.bannerURL({dynamic: true, size: 512}) || "")
            .addFields(
                {name: "Akun ID", value: target.user.id},
                {name: "Join Server", value: `${moment(target.joinedTimestamp).format("Do MMMM YYYY, Jam: HH:mm:ss")}`, inline: true},
                {name: "Akun Dibuat", value: `${moment(target.user.createdTimestamp).format("Do MMMM YYYY, Jam: HH:mm:ss")}`, inline: true},
                {name: "Roles", value: target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"},
                {name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None"},
                {name: "Banner", value: target.user.bannerURL() ? "** **" : "None"}
            );
            
        interaction.reply({embeds: [response]})
    }
}
//{name: "Akun Dibuat", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true},