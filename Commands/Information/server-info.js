const { CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");
require('moment/locale/id')

module.exports = {
    name: "server-info",
    description: "Info Server",
    usage: "/server-info",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {guild} = interaction;
        const {createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers} = guild;

        const Embed = new MessageEmbed()
        .setColor("#58c5fc")
        .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
        .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
        .addFields(
            {
                name: "GENERAL",
                value:
                `
                Nama Server: ${guild.name}
                Dibuat: ${moment(createdTimestamp).format('Do MMMM YYYY')}
                Owner: <@${ownerId}>

                Deskripsi: ${description}
                `
            },
            {
                name: "<:Members:949128925521530940> | USERS",
                value:
                `
                <:Members:949128925521530940> Members: ${members.cache.filter((m) => !m.user.bot).size}
                <:Bot:949128848736419880> Bots: ${members.cache.filter((m) => m.user.bot).size}             
                <:Roles:949128981192532039> Roles: ${guild.roles.cache.size}

                Total: ${memberCount}
                `, inline: false
            },
            {
                name: "<:Channels:949128848740606002> | CHANNELS",
                value: 
                `
                <:text:814491308059394099> Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                <:voice:949682720420802562> Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                <:category:949682631132475412> Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}

                Total: ${channels.cache.size}
                `, inline: false
            },
            {
                name: "<:fucek:854199513840615494> | EMOJIS & STICKERS",
                value: 
                `
                <:senyuminaja:810365837797228544> Emoji Animasi: ${emojis.cache.filter((e) => e.animated).size}
                <:senyuminaja:810365837797228544> Emoji Statik: ${emojis.cache.filter((e) => !e.animated).size}
                <:senyuminaja:810365837797228544> Stikers: ${stickers.cache.size}

                Total: ${stickers.cache.size + emojis.cache.size}
                `, inline: false
            },
            {
                name: "<a:Boost:876701360375095336> | NITRO STATISTIK",
                value:
                `
                <a:NitroBoost:876701468856578120> Level: ${guild.premiumTier.replace("Level", " ")}
                <a:Boost:876701360375095336> Boosts: ${guild.premiumSubscriptionCount}
                <a:NitroBoost:876701468856578120> Boosters: ${members.cache.filter((m) => m.premiumSince).size}
                `, inline: false
            }
        )
        .setFooter({text: "Terakhir Dicek"}).setTimestamp();

        interaction.reply({embeds: [Embed]});
    }
}