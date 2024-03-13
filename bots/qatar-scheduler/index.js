const trellolink = "https://api.trello.com/1/lists/65d17e08ea7201e9d96f4326/cards?key=4a90d231a30ce6e3ab41c1046088abb5&token=94087062e584167ccfd2215496b99b019771e54af06cc8d4a05835871f055cc1"
const webhooklink = "https://discord.com/api/webhooks/1208614548266025032/jIb5n3KqQet1Mtd6gNTWczTe6ZvN-7cO6hx1xjBsB_cn0fLUf5sx7sI797poBNggLJI4"
const editmsg = "1208620228062486591"
const fetch = require("node-fetch");
const { WebhookClient } = require("discord.js");

setInterval(async () => {
	const data = await (await fetch(trellolink)).json(),
		webhookClient = new WebhookClient({ url: webhooklink });
		
	let content = ``;
	data.forEach(list => content += list.desc + "\n\n");
  if (content == '') {
	content = `There are no current flights at this time, check back later for new flights.
This message will update every few minutes.`
	}
		webhookClient.editMessage(editmsg, { content, username: "Quantum Assistant", avatarURL: 'https://cdn.discordapp.com/avatars/1204908654784946236/feb86cf50354dc944a233ee7359639fb?size=1024'});

}, 60000);
