const { MessageEmbed, CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "helps",
  description: "shows all available commands",
  usage: "/helps [command]",
  options: [
    {
      name: "command",
      description: "command to get more info on",
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
            `no commands was found with the name of \`${cmdName}\`!\n Use \`/help\` to see all the available commands`
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


// const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// module.exports = {
// 	name: 'helps',
// 	description: "Untuk Melihat Semua Command",
// 	/**
// 	 * 
// 	 * @param {CommandInteraction} interaction 
// 	 * @param {Client} client 
// 	 */
// 	async execute(interaction, client) {
// 		const help = new MessageEmbed()
// 			.setTitle('<:generalChat:934476109989425252> Rumah Kedua Help Menu')
// 			.setColor('BLUE')
// 			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
// 			.setDescription('Untuk Melihat Semua Command Bot Tekan Tombol Di Bawah <:DownVote:949128924850442301>')
// 			.setFields(
// 				{
// 					name: '<:info:935072188233547806> Info',
// 					value: `\`9 Information Cmds\``,
// 					inline: true
// 				}, {
// 				name: '<:util:935089387040022579> Utility',
// 				value: `\`6 Utility Cmds\``,
// 				inline: true
// 			}, {
// 				name: '<:premium:929433743599489044> Image',
// 				value: `\`4 Image Cmds\``,
// 				inline: true
// 			}, {
// 				name: '<:Ticket:935077407554146345> Ticket',
// 				value: `\`2 Ticket cmds\``,
// 				inline: true
// 			}, {
// 				name: '<:moderation:935075898862993439> Moderation',
// 				value: `\`17 Moderation Cmds\``,
// 				inline: true
// 			}, {
// 				name: '<:utility:935073407387725924> Owner Bot',
// 				value: `\`3 Owner Bot Cmds\``,
// 				inline: true
// 			}
// 			)
// 			.setTimestamp()
// 			.setFooter({ text: 'RUMAH KEDUA © 2022' })

// 		const embed1 = new MessageEmbed()
// 			.setTitle('Information Commands')
// 			.setDescription(`\`avatar\`, \`banner\`, \`guilds\`, \`helps\`, \`invite\`, \`server-info\`, \`status\`, \`user-info\`, \`userinfo\``)
// 			.setColor('2e3137')
// 			.setTimestamp()

// 		const embed2 = new MessageEmbed()
// 			.setColor('2e3137')
// 			.setTitle('Utility Commands')
// 			.setDescription(`\`afk\`, \`music\`, \`remind\`, \`suggest\`, \`translate\`, \`voice\``)
// 			.setTimestamp()

// 		const embed3 = new MessageEmbed()
// 			.setColor('2e3137')
// 			.setTitle('Image Commands')
// 			.setDescription(`\`anime\`, \`cat\`, \`dog\`, \`img\``)
// 			.setTimestamp()

// 		const embed4 = new MessageEmbed()
// 			.setColor('2e3137')
// 			.setTitle('Ticket Commands')
// 			.setDescription(`\`ticket\`, \`ticketsetup\``)
// 			.setTimestamp()

// 		const embed5 = new MessageEmbed()
// 			.setColor('2e3137')
// 			.setTitle('Moderation Commands')
// 			.setDescription(`\`ban\`, \`clear\`, \`emitt\`, \`giveaway\`, \`kick\`, \`leavesetup\`, \`lock\`, \`menu\`, \`nick\`, \`role\`, \`say\`, \`send-message\`, \`unban\`, \`unlock\`, \`vcsetup\`, \`voicemove\`, \`welcomesetup\``)
// 			.setTimestamp()

// 		const embed6 = new MessageEmbed()
// 			.setColor('2e3137')
// 			.setTitle('Owner Bot Commands')
// 			.setDescription(`\`dm-user\`, \`restart\`, \`dm-role\``)
// 			.setTimestamp()


// 		const row = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935072188233547806')
// 					.setCustomId('info'),

// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935089387040022579')
// 					.setCustomId('utility'),

// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setEmoji('929433743599489044')
// 					.setCustomId('image'),

// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935077407554146345')
// 					.setCustomId('ticket'),

// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setEmoji('moderation:935075898862993439')
// 					.setCustomId('moderation'),


// 			)

// 		const row2 = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setStyle('SECONDARY')
// 					.setCustomId('owner bot')
// 					.setEmoji('935073407387725924')
// 			)

// 		const row3 = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setStyle('LINK')
// 					.setEmoji('930143460277751808')
// 					.setURL('https://discord.com/api/oauth2/authorize?client_id=831070305031159848&permissions=8&scope=bot%20applications.commands')
// 					.setLabel('Invite Rumah Kedua')
// 			)
// 		const row4 = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935072188233547806')
// 					.setCustomId('info'),

// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935089387040022579')
// 					.setCustomId('utility'),

// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setEmoji('929433743599489044')
// 					.setCustomId('image'),

// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setEmoji('935077407554146345')
// 					.setCustomId('ticket'),

// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setEmoji('moderation:935075898862993439')
// 					.setCustomId('moderation'),
// 			)
// 		const row5 = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setDisabled()
// 					.setStyle('SECONDARY')
// 					.setCustomId('owner bot')
// 					.setEmoji('935073407387725924')
// 			)

// 		const msg = interaction.reply({ embeds: [help], components: [row, row2] })

// 		const collector = interaction.channel.createMessageComponentCollector({
// 			time: 1000 * 60
// 		});

// 		collector.on('collect', async interaction => {
// 			if (interaction.customId === 'info') {
// 				await interaction.reply({ embeds: [embed1], components: [row3], ephemeral: true })
// 			} else if (interaction.customId === 'utility') {
// 				await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true })
// 			} else if (interaction.customId === 'image') {
// 				await interaction.reply({ embeds: [embed3], components: [row3], ephemeral: true })
// 			} else if (interaction.customId === 'ticket') {
// 				await interaction.reply({ embeds: [embed4], components: [row3], ephemeral: true })
// 			} else if (interaction.customId === 'moderation') {
// 				await interaction.reply({ embeds: [embed5], components: [row3], ephemeral: true })
// 			} else if (interaction.customId === 'owner bot') {
// 				await interaction.reply({ embeds: [embed6], components: [row3], ephemeral: true })
// 			}
// 		})

// 		collector.on('end', async () => {
// 			interaction.editReply({
// 				embeds: [help],
// 				components: [row4, row5]
// 			})
// 		})
// 	}
// }