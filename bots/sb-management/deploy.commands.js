const { EmbedBuilder, ButtonStyle, Client, Events, ActionRowBuilder, ButtonBuilder, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('node:fs');
const { token9 } = require('../../config.json');
require("./deploy-commands")

const Discord = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });

//client.commands = new Collection();
//const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/*for (const file of commandFiles) {
  const command = require(`../../commands/${file}`);
  client.commands.set(command.data.name, command);
}*/
client.commandsa = new Collection();
const commandaFiles = fs.readdirSync('./bots/ccbot/special').filter(file => file.endsWith('.js'));

for (const file of commandaFiles) {
  const commanda = require(`./special/${file}`);
  client.commandsa.set(commanda.data.name, commanda);
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! (logged into ${c.user.tag})`);
  client.user.setPresence({
  activities: [{ name: `serving results`, type: ActivityType.Playing }],
  status: 'idle',
})});



client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isCommand()) {
  //const command = client.commands.get(interaction.commandName);
  const commanda = client.commandsa.get(interaction.commandName);
  try {
    /*if (command) {
      await command.execute(interaction, client, interaction.options._hoistedOptions);
    }*/
    if (commanda) {
      await commanda.execute(interaction, client, interaction.options._hoistedOptions);
    }
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
} else if (interaction.isButton()) {
  const id = interaction.customId;
  const buttonthing = id.split(' ')
  const member = interaction.guild.members.cache.get(buttonthing[5]);
  const embed = new EmbedBuilder()
    .setAuthor({ name: "Cabin Crew Assistant" })
    .setTitle("Trial Information")
    .setDescription(`
    Congratulations! Your application for Cabin Crew Trainer has been accepted, and your trial has been started by a member of Cabin Crew Leadership.

    **To complete your trial, you will need to:**

    • Host one Module 3 training
    • Host one Private Flight training
    • Carry out one  Module 4 supervision
    
    Your Module 3 & Private Flight trainings will need to be verified by a qualified Cabin Crew Trainer. This can be either you being supervised by a qualified CCT or you may choose to host your training, and record the major parts, and send them in this ticket for a CCT to review. For your M4 supervision, you **do not** need a supervisor or to record.

    You may find all the trainer guides you will need in the <#1023332478456438864> channel as well as all formats you are required to use to send the messages for each training type in the <#1033413759651303605> channel.

    All sessions you host must be logged within ⁠<#1117454698623021097> - including trainees who failed. In the event that you host a training during your trial with a supervisor and no trainees show up, do not cancel the training. Instead, your supervisor will act as a trainee.

    **How to log your training:** Run /cct-log in <#1117454698623021097>. All your sessions **must** be logged after you have finished.

    In addition to the information included within this message, you are also required to familiarize yourself with the pinned messages in <#1038957615855697991>. If you have any questions, please feel free to contact a qualified member of the Cabin Crew Trainer team or Cabin Crew Leadership. If you state an inquiry here, an individual who is able to assist you will respond when possible.

    If you would like to be supervised for a specific training, ping the <@&1023324765676650536> role in this ticket or in ⁠<#1038957615855697991>. State the type of session you want to complete, as well as the time you would like to host at. An available qualified CCT will respond if they can supervise you.


    `)
    .setFooter({ text: "You're all set!" })
  const embed2 = new EmbedBuilder()
  const m3 = new ButtonBuilder()
  const m4 = new ButtonBuilder()
  const pf = new ButtonBuilder()
  const finish = new ButtonBuilder()
  if (interaction.member.roles.cache.has("1023321861049823344")) {
  switch(buttonthing[0]) {
    case "m3": 
    if (buttonthing[3] == "yes" && buttonthing[4] == "yes") {
    embed2.setAuthor({ name: "Cabin Crew Assistant" })
    embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
    embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Success);
      m4.setDisabled(true);
			pf.setCustomId(`pf ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Success)
      pf.setDisabled(true);
      finish.setCustomId(`finish ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(false);
    } else if (buttonthing[3] == "yes") {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`To be hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Success);
      m4.setDisabled(true);
			pf.setCustomId(`pf ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Danger);
      finish.setCustomId(`finish ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(true);
    } else if (buttonthing[4] == "yes") {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`To be Completed\`
    Private flight training - \`Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Danger);
			pf.setCustomId(`pf ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Success)
      pf.setDisabled(true);
      finish.setCustomId(`finish ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(true);
    } else {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`To be Completed\`
    Private flight training - \`To be Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes not not ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes not not ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Danger);
			pf.setCustomId(`pf ${buttonthing[1]} yes not not ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Danger);
      finish.setCustomId(`finish ${buttonthing[1]} yes not not ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(true);
    }
            const row = new ActionRowBuilder()
			.addComponents(m3, m4, pf, finish);
      client.channels.cache.get(interaction.channelId).messages.edit(buttonthing[1], {embeds: [embed, embed2], components: [row]})
    interaction.reply({ content: "Switched M3 to complete.", ephemeral: true })
    break;
    case "m4": 
    if (buttonthing[2] == "yes" && buttonthing[4] == "yes") {
    embed2.setAuthor({ name: "Cabin Crew Assistant" })
    embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
    embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Success)
      m4.setDisabled(true);
			pf.setCustomId(`pf ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Success)
      pf.setDisabled(true);
      finish.setCustomId(`finish ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(false);
    } else if (buttonthing[2] == "yes") {
    embed2.setAuthor({ name: "Cabin Crew Assistant" })
    embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
    embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`To be hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Success)
      m3.setDisabled(true);
			m4.setCustomId(`m4 ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Success);
      m4.setDisabled(true);
			pf.setCustomId(`pf ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Danger);
      finish.setCustomId(`finish ${buttonthing[1]} yes yes not ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(true);
    } else if (buttonthing[4] == "yes") {
    embed2.setAuthor({ name: "Cabin Crew Assistant" })
    embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
    embed2.setDescription(`
    Module 3 Training - \`To be Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
			m3.setCustomId(`m3 ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
			m3.setLabel('Set M3 Completed')
			m3.setStyle(ButtonStyle.Danger)
			m4.setCustomId(`m4 ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
			m4.setLabel('Set M4 Completed')
			m4.setStyle(ButtonStyle.Success);
      m4.setDisabled(true);
			pf.setCustomId(`pf ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
			pf.setLabel('Set PF Completed')
			pf.setStyle(ButtonStyle.Success);
      pf.setDisabled(true);
      finish.setCustomId(`finish ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
      finish.setLabel('Finish training')
      finish.setStyle(ButtonStyle.Danger);
      finish.setDisabled(true);
    } else  {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
      Module 3 Training - \`To be Hosted\`
      Module 4 Supervision - \`Completed\`
      Private flight training - \`To be Hosted\`
      `)
      embed2.setFooter({ text: "Last Updated:" })
      embed2.setTimestamp()
        m3.setCustomId(`m3 ${buttonthing[1]} not yes not ${buttonthing[5]}`)
        m3.setLabel('Set M3 Completed')
        m3.setStyle(ButtonStyle.Danger)
        m4.setCustomId(`m4 ${buttonthing[1]} not yes not ${buttonthing[5]}`)
        m4.setLabel('Set M4 Completed')
        m4.setStyle(ButtonStyle.Success);
        m4.setDisabled(true);
        pf.setCustomId(`pf ${buttonthing[1]} not yes not ${buttonthing[5]}`)
        pf.setLabel('Set PF Completed')
        pf.setStyle(ButtonStyle.Danger);
        finish.setCustomId(`finish ${buttonthing[1]} not yes not ${buttonthing[5]}`)
			  finish.setLabel('Finish training')
			  finish.setStyle(ButtonStyle.Danger);
        finish.setDisabled(true);
      }
            const row2 = new ActionRowBuilder()
			.addComponents(m3, m4, pf, finish);
      client.channels.cache.get(interaction.channelId).messages.edit(buttonthing[1], {embeds: [embed, embed2], components: [row2]})
    interaction.reply({ content: "Switched M4 to complete.", ephemeral: true })
    break;
    case "pf": 
    if (buttonthing[2] == "yes" && buttonthing[3] == "yes") {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
      Module 3 Training - \`Hosted\`
      Module 4 Supervision - \`Completed\`
      Private flight training - \`Hosted\`
      `)
      embed2.setFooter({ text: "Last Updated:" })
      embed2.setTimestamp()
        m3.setCustomId(`m3 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
        m3.setLabel('Set M3 Completed')
        m3.setStyle(ButtonStyle.Success)
        m3.setDisabled(true);
        m4.setCustomId(`m4 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
        m4.setLabel('Set M4 Completed')
        m4.setStyle(ButtonStyle.Success)
        m4.setDisabled(true);
        pf.setCustomId(`pf ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
        pf.setLabel('Set PF Completed')
        pf.setStyle(ButtonStyle.Success)
        pf.setDisabled(true);
        finish.setCustomId(`finish ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
        finish.setLabel('Finish training')
        finish.setStyle(ButtonStyle.Danger);
        finish.setDisabled(false);
      } else if (buttonthing[2] == "yes") {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
      Module 3 Training - \`Hosted\`
      Module 4 Supervision - \`Completed\`
      Private flight training - \`To be hosted\`
      `)
      embed2.setFooter({ text: "Last Updated:" })
      embed2.setTimestamp()
        m3.setCustomId(`m3 ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
        m3.setLabel('Set M3 Completed')
        m3.setStyle(ButtonStyle.Success)
        m3.setDisabled(true);
        m4.setCustomId(`m4 ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
        m4.setLabel('Set M4 Completed')
        m4.setStyle(ButtonStyle.Danger);
        pf.setCustomId(`pf ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
        pf.setLabel('Set PF Completed')
        pf.setStyle(ButtonStyle.Success);
        pf.setDisabled(true);
        finish.setCustomId(`finish ${buttonthing[1]} yes not yes ${buttonthing[5]}`)
        finish.setLabel('Finish training')
        finish.setStyle(ButtonStyle.Danger);
        finish.setDisabled(true);
      } else if (buttonthing[3] == "yes") {
      embed2.setAuthor({ name: "Cabin Crew Assistant" })
      embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
      embed2.setDescription(`
      Module 3 Training - \`To be Hosted\`
      Module 4 Supervision - \`Completed\`
      Private flight training - \`Hosted\`
      `)
      embed2.setFooter({ text: "Last Updated:" })
      embed2.setTimestamp()
        m3.setCustomId(`m3 ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
        m3.setLabel('Set M3 Completed')
        m3.setStyle(ButtonStyle.Danger)
        m4.setCustomId(`m4 ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
        m4.setLabel('Set M4 Completed')
        m4.setStyle(ButtonStyle.Success);
        m4.setDisabled(true);
        pf.setCustomId(`pf ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
        pf.setLabel('Set PF Completed')
        pf.setStyle(ButtonStyle.Success);
        pf.setDisabled(true);
        finish.setCustomId(`finish ${buttonthing[1]} not yes yes ${buttonthing[5]}`)
        finish.setLabel('Finish training')
        finish.setStyle(ButtonStyle.Danger);
        finish.setDisabled(true);
      } else  {
        embed2.setAuthor({ name: "Cabin Crew Assistant" })
        embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
        embed2.setDescription(`
        Module 3 Training - \`To be Hosted\`
        Module 4 Supervision - \`To be Completed\`
        Private flight training - \`Hosted\`
        `)
        embed2.setFooter({ text: "Last Updated:" })
        embed2.setTimestamp()
          m3.setCustomId(`m3 ${buttonthing[1]} not not yes ${buttonthing[5]}`)
          m3.setLabel('Set M3 Completed')
          m3.setStyle(ButtonStyle.Danger)
          m4.setCustomId(`m4 ${buttonthing[1]} not not yes ${buttonthing[5]}`)
          m4.setLabel('Set M4 Completed')
          m4.setStyle(ButtonStyle.Danger);
          pf.setCustomId(`pf ${buttonthing[1]} not not yes ${buttonthing[5]}`)
          pf.setLabel('Set PF Completed')
          pf.setStyle(ButtonStyle.Success);
          pf.setDisabled(true);
          finish.setCustomId(`finish ${buttonthing[1]} not not yes ${buttonthing[5]}`)
          finish.setLabel('Finish training')
          finish.setStyle(ButtonStyle.Danger);
          finish.setDisabled(true);
        }
              const row3 = new ActionRowBuilder()
        .addComponents(m3, m4, pf, finish);
        client.channels.cache.get(interaction.channelId).messages.edit(buttonthing[1], {embeds: [embed, embed2], components: [row3]})
    interaction.reply({ content: "Switched PF to complete.", ephemeral: true })
    break;
    case "finish": 
    embed2.setAuthor({ name: "Cabin Crew Assistant" })
    embed2.setTitle("<:SPA:1023340062156533840> | Trial Status:")
    embed2.setDescription(`
    Module 3 Training - \`Hosted\`
    Module 4 Supervision - \`Completed\`
    Private flight training - \`Hosted\`
    `)
    embed2.setFooter({ text: "Last Updated:" })
    embed2.setTimestamp()
		m3.setCustomId(`m3 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
		m3.setLabel('Set M3 Completed')
		m3.setStyle(ButtonStyle.Success)
    m3.setDisabled(true);
		m4.setCustomId(`m4 ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
		m4.setLabel('Set M4 Completed')
		m4.setStyle(ButtonStyle.Success)
    m4.setDisabled(true);
		pf.setCustomId(`pf ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
		pf.setLabel('Set PF Completed')
		pf.setStyle(ButtonStyle.Success)
    pf.setDisabled(true);
    finish.setCustomId(`finish ${buttonthing[1]} yes yes yes ${buttonthing[5]}`)
		finish.setLabel('Finish training')
		finish.setStyle(ButtonStyle.Success);
    finish.setDisabled(true);
    const row1 = new ActionRowBuilder()
		.addComponents(m3, m4, pf, finish);
    client.channels.cache.get(interaction.channelId).messages.edit(buttonthing[1], {embeds: [embed, embed2], components: [row1]})
    member.roles.remove(interaction.guild.roles.cache.find(r => r.id === "1194239791978516481"))
    member.roles.remove(interaction.guild.roles.cache.find(r => r.id === "1194239791978516481"))
    interaction.channel.send({ content: `Congrats <@${buttonthing[5]}>! You passed your Cabin Crew Trainer Trial and will be ranked momentarily.` })
    interaction.reply({ content: "Completed.", ephemeral: true })
    member.roles.add(interaction.guild.roles.cache.find(r => r.id === "1023324765676650536"))
    member.roles.add(interaction.guild.roles.cache.find(r => r.id === "1023324765676650536"))
    break;
      }
  } else interaction.reply({ content: "Invalid Permissions", ephemeral: true})
}
});

client.login(token9);
