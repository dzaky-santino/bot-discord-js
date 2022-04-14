const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "Mainkan Musik",
    usage: "/music",
    options: [
        { name: "play", description: "Play A Song", type: "SUB_COMMAND",
            options: [{name: "query", description: "Provide A Name Or A URL For The Song", type: "STRING", required: true}]
        },
        { name: "volume", description: "Alter The Volume", type: "SUB_COMMAND",
            options: [{name: "percent", description: "1 - 100%", type: "NUMBER", required: true}]
        },
        { name: "settings", description: "Select An Option", type: "SUB_COMMAND",
            options: [{name: "options", description: "Select An Option", type: "STRING", required: true,
            choices: [
                {name: "🔢 View Queue", value: "queue"},
                {name: "⏭ Skip Song", value: "skip"},
                {name: "⏸ Pause Song", value: "pause"},
                {name: "▶️ Resume Song", value: "resume"},
                {name: "⏹ Stop Music", value: "stop"},
                {name: "🔀 Shuffle Queue", value: "shuffle"},
                {name: "🔃 Auto Play Song", value: "AutoPlay"},
                {name: "🈁 Add A Related Song", value: "RelatedSong"},
                {name: "🔁 Toggle Repeat", value: "RepeatMode"}
            ]}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const {options, member, guild, channel} = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "you must be in a voice channel to be able to use the music commands", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `i'm already playing music in <#${guild.me.voice.channelId}>`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.play( VoiceChannel, options.getString("query"),  { textChannel: channel, member: member});
                    return interaction.reply({content: "<a:music_not:790076589273645056> **Request Received**"});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "you have to specify a number between 1 and 100"});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `📶 volume has been set to \`${Volume}%\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ There Is No Queue"});

                    switch(options.getString("options")) {
                        case "skip" :
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "⏭ Song Has Been **Skipped**"});

                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "⏹ Song Has Been **Stopped**"});

                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "⏸ Song Has Been **Paused**"});

                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "⏯ Song Has Been **Resumed**"});

                        case "shuffle" :
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({content: "🔀 The Queue Has Been **Shuffled**"});

                        case "AutoPlay" :
                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({content: `🔃 **Autoplay** Mode Is Set To: **${Mode ? "On" : "Off"}**`});

                        case "RelatedSong" :
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({content: "🈁 **A Related Song** Has Been Added The Queue"});

                        case "RepeatMode" :
                        let Mode2 = await client.distube.setRepeatMode(queue);
                        return interaction.reply({content: `🔃 **Repeat Mode** Is Set To: **${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}**`});

                        case "queue" :
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("GOLD")
                        .setDescription(`${queue.songs.map( //.slice(0, 10) ditaruh setelah songs
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]});
                    }
                    return;
                }
            }
        } catch(e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}