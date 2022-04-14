const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { create } = require("sourcebin");

function delay(time) {return new Promise((resolve) => setTimeout(resolve, time))}

module.exports = {
  name: "dm-role",
  description: "Kirim Pesan Kepada Pengguna Jika Mereka Memiliki Peran Tertentu.",
  usage: "/dm-role",
  disabled: false,
  permission: "ADMINISTRATOR",
  options: [
     {
      name: "role",
      description: "Pilih Role",
      type: "ROLE",
      required: true,
    },
    {
      name: "message",
      description: "Berikan Pesan Yang Anda Ingin Kirim",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const role = interaction.options.getRole('role');
    const message = interaction.options.getString("message");
    
    const members = interaction.guild.roles.cache.get(role.id).members
    let memberIds = members.map(m => m.id);

    if(memberIds.length == 0)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`${role} Telah Diberikan Kepada 0 Member, Jadi Bot Tidak Mencoba Untuk DM siapa pun.`)], ephemeral: true})

    const Embed = new MessageEmbed().setColor("AQUA")

    var successfulMembers = 0
    var successfulMembersList = []
    var failedMembers = 0
    var failedMembersList = []

    await interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`**Mengirim DM Ke Semua Member Dengan Role ${role}**.\n\n> DM Sukses: ${successfulMembers}\n\n> DM Gagal: ${failedMembers}\n\n> Member Terbaru: *Mulai dms dalam 5 detik.*`)], fetchReply: true})

    await delay(5000) //This waits 5 seconds before attempting to DM any members. If you want to change it it is in milliseconds so 5000 = 5 seconds.

    for (var i = 0; i < memberIds.length; i++) {
      var member = client.users.cache.get(memberIds[i]);

      try {
        var sendMessage = await member.send({embeds: [new MessageEmbed().setColor("AQUA").setTitle("Isi Pesan 📨").setDescription(`${message}`).addFields({name: "Server", value: `${interaction.guild.name}`, inline: true}, {name: "Role", value: `${role.name}`, inline: true}, {name: "Pengirim Pesan", value: `${interaction.member}`, inline: true})]})
        successfulMembers += 1
        successfulMembersList.push(member)
      
      } catch (error) {
        failedMembers += 1
        failedMembersList.push(member)
      }
      // } catch (error) {
      //   failedMembers += 1
      //   failedMembersList.push(member)
      //   console.log(error)
      // }
      // console.log(error)

      interaction.editReply({embeds: [Embed.setDescription(`**Mengirim DM Ke Semua Member Dengan Role ${role}**\n\n> DM Sukses: ${successfulMembers}\n\n> DM Gagal: ${failedMembers}\n\n> Member Terbaru: ${member}`)]})
    
      await delay(3000) //This waits 3 seconds before DMing the next member. If you want to change it it is in milliseconds so 3000 = 3 seconds.
    }
    const failedMembersMapped = failedMembersList.map((m) => m).join(", ") || "None";
    const successfulMembersMapped = successfulMembersList.map((m) => m).join(", ") || "None"

    var failedMembersMessage = failedMembersMapped
    var successfulMembersMessage = successfulMembersMapped

    if (failedMembersMapped.length > 1024) {
      const failedMembersSourcebin = await create([{name: "failedMembers", content: failedMembersMapped}])
      failedMembersMessage = failedMembersSourcebin.url
    }

    if (successfulMembersMapped.length > 1024) {
      const successfulMembersSourcebin = await create([{name: "successfulMembers", content: successfulMembersMapped}])
      successfulMembersMessage = successfulMembersSourcebin.url
    }

    interaction.editReply({content: `${interaction.member}`, embeds: [Embed.setDescription(`**Selesai Mengirim DM Ke Semua Member Dengan Role ${role}**`).addFields({name: "DM Sukses", value: `${successfulMembers}`}, {name: "DM Gagal", value: `${failedMembers}`, inline: true}, {name: "Successful members", value: `${successfulMembersMessage}`}, {name: "Failed members", value: `${failedMembersMessage}`})]})
  },
};