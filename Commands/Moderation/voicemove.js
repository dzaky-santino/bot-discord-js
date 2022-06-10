const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "voicemove",
  description: "Transferring Member From Current Voice Channel To Another",
  usage: "/voicemove",
  permission: "MANAGE_CHANNELS",
  options: [
    {
      name: "move-from",
      description: "Select The Channel Where You Want To Transfer Members",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: true,
    },
    {
      name: "move-to",
      description: "Select Destination Channel To Move Members",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: true,
    }
  ],
  async execute(interaction, client) {
    const { member, guild, options } = interaction;
    const newChannel = options.getChannel("move-to");
    const voiceChannel = options.getChannel("move-from");
    
    if(newChannel === voiceChannel) return interaction.reply({content: "You Can't Move Members To The Same Channel They're On!", ephemeral: true})
    if(voiceChannel.members.size < 1) return interaction.reply({content: "There Are No Members On The Voice Channel!", ephemeral: true})

    voiceChannel.members.forEach(m => {
      m.voice.setChannel(newChannel, `Voice Moved by ${member.user.tag}`)
    })
    interaction.reply({content: `Moved all users to ${newChannel}.`, ephemeral: true})
  }
}
