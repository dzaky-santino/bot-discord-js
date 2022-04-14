const { CommandInteraction, Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "overview",
    description: "Memperbarui Gambaran Server Secara Otomatis",
    usage: "/overview",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'member',
            description: 'Pilih Channel Untuk Tampilan Jumlah Member',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'channel',
            description: 'Pilih Channel Untuk Tampilan Jumlah Channel',
            type: 'CHANNEL',
            required: false,
        }
],
/**
 * 
 * @param {CommandInteraction} interaction 
 */
    async execute(interaction) {

        const { guild } = interaction;

        const { members, memberCount, channels, stickers, emojis, voiceChannels } = guild;

        const member = interaction.options.getChannel('member')
        const channel = interaction.options.getChannel('channel')

        const name = interaction.guild.channels.cache.get(member.id)
        const name1 = interaction.guild.channels.cache.get(channel.id)

        const aaa = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`A guild overview has begun and will renew every 3 minutes`)

        interaction.reply({ embeds: [aaa] })

        setInterval(() => {

                    const channelName = `Members: ${memberCount}`;
                    const channelPlayer = `Channels: ${channels.cache.size}`;

                    name.setName(channelName);
                    name1.setName(channelPlayer);

            }, 30000)}}
