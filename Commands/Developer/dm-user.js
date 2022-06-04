const { CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "dm-user",
  description: "Send Messages To Members With Bots",
  usage: "/dm-user",
  options: [
    {
      name: "target",
      description: "Choose Target",
      type: "USER",
      required: true,
    },
    {
      name: "message",
      description: "Give the Message You Want The Bot To Send.",
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
          content: "You Don't Have Permission <:icons_Wrong:859388130636988436>",
        });
      }

    if (target.id === client.user.id)
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`You Can't **DM** ${client.user} <:icons_Wrong:859388130636988436>`)
            .setColor("#RED"),
        ],
        ephemeral: true,
      });

    if (target) {
      try {
        await target.send(say)
        return interaction.reply({
          content: "Message sent",
          ephemeral: true,
        });
      } catch (err) {
        console.log(err);
        return interaction.reply({ content: "Something Went Wrong" })
      };
    };
  },
};
