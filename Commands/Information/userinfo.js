const { MessageEmbed, ContextMenuInteraction } = require("discord.js");
const moment = require("moment");
require('moment/locale/id')

module.exports = {
    name: "userinfo",
    type: "USER",
    /**
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)
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
            
        interaction.reply({embeds: [response] })
    }
}

// const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "userinfo",
//     type: "USER",
//     permission: "SEND_MESSAGES",
//     /**
//      * 
//      * @param {ContextMenuInteraction} interaction 
//      */
//     async execute(interaction) {
//         const target = await interaction.guild.members.fetch(interaction.targetId);

//         const Response = new MessageEmbed()
//         .setColor("LIGHT_GREY")
//         .setAuthor({name: target.user.tag, iconURL: target.user.avatarURL({dynamic: true, size: 512})})
//         .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
//         .addField("ID", `${target.user.id}`, true)
//         .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
//         .addField("Member Sejak", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
//         .addField("Pengguna Discord Sejak", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

//         interaction.reply({embeds: [Response]})
//     }
// }