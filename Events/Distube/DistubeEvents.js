const client = require("../../index");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`🎶 | **Playing** `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]}))

    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`🎶 | **Added**`)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\` to the queue by ${song.user}`)]}))

    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("DARK_BLUE")
    .setTitle(`🎶 | Playlist Added To Queue`)
    .setThumbnail(playlist.thumbnail)
    .setDescription(`[${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]}))

    .on('error', (channel, e) => {
        channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`⛔ | An Error Encountered: ${e}`)]})
        console.error(e)
    })

    .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`👋 | Voice Channel Is Empty, Leaving The Channel`)]}
    ))

    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`⛔ | NO Result Found`)]}))

    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`👋 | Queue Is Finished, Leaving The Channel`)]}
    )) 