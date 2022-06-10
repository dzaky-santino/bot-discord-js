const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { create } = require("sourcebin");

function delay(time) {return new Promise((resolve) => setTimeout(resolve, time))}

module.exports = {
  name: "dm-role",
  description: "Send Message To Users If They Have A Specific Role.",
  usage: "/dm-role",
  permission: "ADMINISTRATOR",
  options: [
     {
      name: "role",
      description: "Choose Role",
      type: "ROLE",
      required: true,
    },
    {
      name: "message",
      description: "Give The Message You Want To Send",
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
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`${role} Has Been Given To 0 Members, So The Bot Is Not Trying To DM anyone.`)], ephemeral: true})

    const Embed = new MessageEmbed().setColor("AQUA")

    var successfulMembers = 0
    var successfulMembersList = []
    var failedMembers = 0
    var failedMembersList = []

    await interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`**Send Message to All Members With Selected Role ${role}**.\n\n> Successful DMs: ${successfulMembers} <:icons_Correct:859388130411282442>\n\n> DM Failed: ${failedMembers} <:icons_Wrong:859388130636988436>\n\n> Newest Member: *Start dms in 5 seconds.*`)], fetchReply: true})

    await delay(5000) //This waits 5 seconds before attempting to DM any members. If you want to change it it is in milliseconds so 5000 = 5 seconds.

    for (var i = 0; i < memberIds.length; i++) {
      var member = client.users.cache.get(memberIds[i]);

      try {
        var sendMessage = await member.send({embeds: [new MessageEmbed().setColor("AQUA").setTitle("Message Content 📨").setDescription(`${message}`).addFields({name: "Server", value: `${interaction.guild.name}`, inline: true}, {name: "Role", value: `${role.name}`, inline: true}, {name: "Message Sender", value: `${interaction.member}`, inline: true})]})
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

      interaction.editReply({embeds: [Embed.setDescription(`**Send Message to All Members With Selected Role ${role}**\n\n> Successful DMs: ${successfulMembers} <:icons_Correct:859388130411282442>\n\n> DM Failed: ${failedMembers} <:icons_Wrong:859388130636988436>\n\n> Newest Member: ${member}`)]})
    
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

    interaction.editReply({content: `${interaction.member}`, embeds: [Embed.setDescription(`**Done Sending DM To All Members With Selected Role ${role}**`).addFields({name: "Successful DMs <:icons_Correct:859388130411282442>", value: `${successfulMembers}`}, {name: "DM Failed <:icons_Wrong:859388130636988436>", value: `${failedMembers}`, inline: true}, {name: "Successful members <:icons_Correct:859388130411282442>", value: `${successfulMembersMessage}`}, {name: "Failed members <:icons_Wrong:859388130636988436>", value: `${failedMembersMessage}`})]})
  },
};