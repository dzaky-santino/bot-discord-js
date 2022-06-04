const { CommandInteraction, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "restart",
  description: "Restart Bot",
  usage: "/restart",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    if (!config.OwnerID.includes(member.id)) {
      return interaction.reply({
        content: "You Don't Have Permission To Restart Bot <:icons_Wrong:859388130636988436>",
      });
    }
    await interaction
      .reply({ content: "Restarting... <a:Loading:949128848707059782>" })
      .then(() => {
        client.destroy();
        console.log(
          `[Client] Restarting by ${member.user.username} in ${guild.name}`
        );
      })
      .then(() => {
        client.login(config.Token);
        console.log("[Client] Ready");
      });
  },
};
