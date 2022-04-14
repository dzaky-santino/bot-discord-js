const { CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "dm-user",
  description: "Kirim Pesan Ke Member Dengan Bot",
  usage: "/dm-user",
  options: [
    {
      name: "target",
      description: "Pilih Target",
      type: "USER",
      required: true,
    },
    {
      name: "message",
      description: "Berikan Pesan Yang Anda Inginkan Untuk Dikirim Oleh Bot.",
      type: "STRING",
      required: true,
    },
  ],

  /**
   * @param {ClientInteraction} interaction
   */
  async execute(interaction, client) {
    const {member} = interaction;
    const target = interaction.options.getMember("target");
    const say = interaction.options.getString("message");

    if (!config.OwnerID.includes(member.id)) {
        return interaction.reply({
          content: "<a:Silang:944148235600146453> Anda Tidak Memiliki Izin",
        });
      }

    if (target.id === client.user.id)
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`Kamu Tidak Bisa **DM** ${client.user}.`)
            .setColor("#RED"),
        ],
        ephemeral: true,
      });

    if (target) {
      try {
        await target.send(say)
        return interaction.reply({
          content: "Pesan Terkirim",
          ephemeral: true,
        });
      } catch (err) {
        console.log(err);
        return interaction.reply({ content: "Something Went Wrong" })
      };
    };
  },
};
