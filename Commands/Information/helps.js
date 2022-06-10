const { MessageEmbed, CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "helps",
  description: "Shows All Available Commands",
  permission: "SEND_MESSAGES",
  usage: "/helps [command]",
  options: [
    {
      name: "command",
      description: "Command To Get More Info",
      type: "STRING",
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let error = false;
    let cmdFound = "";
    const { options } = interaction;

    const embed = new MessageEmbed().setTimestamp();

    const cmdName = options.getString("command");
    if (cmdName) {
      await client.commands.map((cmd) => {
        if (cmd.name == cmdName) {
          let cmdoptions = cmd.options;
          cmdFound = cmd.name;
          embed.setTitle(`Help for ${cmd.name}`);
          embed.setColor("#0099ff");
          embed.setDescription(
            `Description: ${cmd.description || "none"}\n Usage: ${
              cmd.usage || "none"
            }`
          );
          if (cmdoptions) {
            embed.setDescription(
              `Description: ${cmd.description || "none"}\n Usage: ${
                cmd.usage || "none"
              }\n commands (might have choices within the command):`
            );
            cmdoptions.map((option) => {
              embed.addField(
                option.name,
                `Description: ${option.description || "none"}`
              );
            });
          }
          error = false;
        } else if (!cmdFound) {
          embed.setColor("RED");
          embed.setTitle("no command");
          embed.setDescription(
            `no commands was found with the name of \`${cmdName}\`!\n Use \`/helps\` to see all the available commands`
          );

          error = true;
        }
      });
    } else {
      embed.setTitle("Available Commands");
      embed.setColor("#0099ff");
      embed.setDescription(
        client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
      );
      embed.setFooter({
        text: `${client.commands.size} commands`,
      });
      error = false;
    }
    await interaction.reply({
      embeds: [embed],
      ephemeral: error,
    });
    cmdFound = "";
  },
};