const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "voicemove",
  description: "Pindahkan Member Dari Channel Voice Saat Ini Ke Yang Lain.",
  usage: "/voicemove",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "move-from",
      description: "Pilih Channel Tempat Anda Ingin Memindahkan Member.",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: true,
    },
    {
      name: "move-to",
      description: "Pilih Channel Tujuan Untuk Memindahkan Member.",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: true,
    }
  ],
  async execute(interaction, client) {
    const { member, guild, options } = interaction;
    const newChannel = options.getChannel("move-to");
    const voiceChannel = options.getChannel("move-from");
    
    if(newChannel === voiceChannel) return interaction.reply({content: "Kamu Tidak Dapat Memindahkan Member Ke Channel Yang Sama Dengan Tempat Mereka Berada!", ephemeral: true})
    if(voiceChannel.members.size < 1) return interaction.reply({content: "Tidak Ada Member Di Channel Voice Tersebut!", ephemeral: true})

    voiceChannel.members.forEach(m => {
      m.voice.setChannel(newChannel, `Voice Moved by ${member.user.tag}`)
    })
    interaction.reply({content: `Moved all users to ${newChannel}.`, ephemeral: true})
  }
}

// const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "voicemove",
//   description: "Move users from the current vc to another channel.",
//   permission: "MOVE_MEMBERS",
//   options: [
//     {
//       name: "move-to",
//       description: "Select the channel you want to move the members to.",
//       type: "CHANNEL",
//       channelTypes: ["GUILD_VOICE"],
//       required: true,
//     }
//   ],
//   async execute(interaction, client) {
//     const { member, options } = interaction;
//     const newChannel = options.getChannel("move-to");
//     const voiceChannel = member.voice.channel;

//     if(!voiceChannel) return interaction.reply({content: "You need to be in the voice channel to move the members!", ephemeral: true});
//     if(newChannel === voiceChannel) return interaction.reply({content: "You can't move members to the same channel they are already in!", ephemeral: true})

//     voiceChannel.members.forEach(m => {
//       m.voice.setChannel(newChannel, `Voice Moved by ${member.user.tag}`)
//     })
//     interaction.reply({content: `Moved all users to ${newChannel}.`, ephemeral: true})
//   }
// }