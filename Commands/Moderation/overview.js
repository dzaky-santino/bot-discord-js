const { CommandInteraction, Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "overview",
    description: "Update Server Overview Automatically",
    usage: "/overview",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'member',
            description: 'Select Channel To Display Number Of Members',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'channel',
            description: 'Select Channel To Display The Number Of Channels',
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
