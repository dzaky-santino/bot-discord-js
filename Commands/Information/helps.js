const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
	name: "helps",
	description: "Tampilan Semua Command",
	usage: "/helps", //Add usage like this to your commands
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
		async execute(interaction) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('helpPreviousPage')
			.setLabel("\u200b")
			.setStyle("SECONDARY")
			.setEmoji("◀️"),
			new MessageButton()
			.setCustomId('helpNextPage')
			.setLabel("\u200b")
			.setStyle("SECONDARY")
			.setEmoji("▶️"),
		)
		const Commands = []
		readdirSync("./Commands").forEach((folder) => {
			readdirSync(`./Commands/${folder}`).forEach((file) => {
				const command = require(`../../Commands/${folder}/${file}`);
				if (command.context || !command.name) return;
				Commands.push(command);
			})
		})
		const Embeds = [];
		let page = 0;
		const CommandsLength = Commands.length;
		const chunkSize = 25;
		for (let i = 0; i < CommandsLength; i += chunkSize) {
			const chunk = Commands.slice(i, i + chunkSize);
			const Response = new MessageEmbed()
			.setColor("GREYPLE")
			.setTitle(`List of commands: (${Embeds.length+1}/${Math.ceil(Commands.length/chunkSize)})`)
			chunk.forEach((ChunkCommand) => {
				const upperCaseName = ChunkCommand.name.charAt(0).toUpperCase() + ChunkCommand.name.slice(1);
				Response.addField(`${upperCaseName}`, `*Usage*: \`${ChunkCommand.usage || "Usage not provided"}\`\n*Description*: ${ChunkCommand.description || "Description not provided"}`, true)
			})
			Embeds.push(Response);
		}
		await interaction.reply({embeds: [Embeds[page]], components: [row]});

		const iFilter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({filter: iFilter, time: 15000});

		collector.on('collect', async i => {
			if(i.customId === "helpNextPage"){
				page ++;
				if (page>Embeds.length-1) {
					page=0;
				}
				await i.update({embeds: [Embeds[page]], components: [row]});
			} else if(i.customId === "helpPreviousPage") {
				page --;
				if (page<0){
					page=(Embeds.length)-1;
				}
				await i.update({embeds: [Embeds[page]], components: [row]});
			}
		})

		collector.on('end', collected => {
			row.components.forEach((button) => {
				button.setDisabled(true);
				interaction.editReply({embeds: [Embeds[page]], components: [row]});
			})
		})
	}
}

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