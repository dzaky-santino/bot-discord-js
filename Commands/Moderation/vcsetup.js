const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");

const channelID = '955844075934859283' // PUT YOUR CHANNEL ID HERE. THE EMBED WILL BE SENT TO THIS CHANNEL FOR CONTROLLING VOICE ROOMS WITH BUTTONS.

module.exports = {
  name: "vcsetup",
  description: "Setup Voice Rooms.",
  usage: "/vcsetup",
  permission: "MANAGE_CHANNELS",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {

    const { guild } = interaction;
    
    const Embed = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor({name: "🔊 Voice Rooms"})
    .setDescription(`Gunakan Custom Voice Room Untuk Memiliki Channel Voice Terpisah Hanya Untuk Anda Dan Teman Anda!
    
    ▫ ️Gunakan \`/vc\` Command Untuk Konfigurasi Channel Voice Anda.`)
    .setFooter({text: `Gunakan Tombol Di Bawah Untuk Mengontrol Channel Voice Anda.`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    const Buttons = new MessageActionRow();
    Buttons.addComponents(
    new MessageButton()
      .setCustomId("hide")
      .setLabel("Hide")
      .setStyle("DANGER")
      .setEmoji("⛔"),
    new MessageButton()
      .setCustomId("unhide")
      .setLabel("Unhide")
      .setStyle("PRIMARY")
      .setEmoji("👁️"),
    new MessageButton()
      .setCustomId("public")
      .setLabel("Public")
      .setStyle("SUCCESS")
      .setEmoji("<:Lock:949128848723824680>"),
    new MessageButton()
      .setCustomId("private")
      .setLabel("Private")
      .setStyle("PRIMARY")
      .setEmoji("<:Unlock:949128980957638688>"),
    );

    const Buttons2 = new MessageActionRow();
    Buttons2.addComponents(
    new MessageButton()
      .setCustomId("increase")
      .setLabel("Tambahkan Limit")
      .setStyle("SECONDARY")
      .setEmoji("➕"),
    new MessageButton()
      .setCustomId("decrease")
      .setLabel("Kurangi Limit")
      .setStyle("SECONDARY")
      .setEmoji("➖"),
    );

    await guild.channels.cache.get(`${channelID}`).send({embeds: [Embed], components: [Buttons,Buttons2]});

    interaction.reply({ content: "Voice rooms setup complete.",ephemeral: true})
  }
}