const { Client } = require('discord-rpc');
const config = require('./settings/config.json');
const client = new Client({ transport: 'ipc' });
const prettyMs = require('pretty-ms');
const cache = new Map();

function changeButtons() {
  let status = 'Blurple Development';

  if (cache.get(status) == true) {
    cache.set(status, false);
    return client.request('SET_ACTIVITY', {
      pid: process.pid,
      activity: {
        assets: {
          large_image: config.set_one.assets.image_key,
          large_text: config.set_one.assets.image_text,
        },
        buttons: [
          { label: config.set_one.button_one.label_name, url: config.set_one.button_one.label_url },
          { label: config.set_one.button_two.label_name, url: config.set_one.button_two.label_url },
        ],
        instance: config.instance || true
      },
    });
  } else {
    cache.set(status, true);
    return client.request('SET_ACTIVITY', {
      pid: process.pid,
      activity: {
        assets: {
          large_image: config.set_two.assets.image_key,
          large_text: config.set_two.assets.image_text,
        },
        buttons: [
          { label: config.set_two.button_one.label_name, url: config.set_two.button_one.label_url },
          { label: config.set_two.button_two.label_name, url: config.set_two.button_two.label_url },
        ],
        instance: config.instance || true
      },
    });
  }
}

client.on('ready', async () => {
  if (config.interval < 60) {
    console.error("Due to Discord API Ratelimiting, it is best to keep the interval count above 60 (60 seconds)")
  }
  setInterval(function () {
    try {
      changeButtons();
    } catch (e) {
      console.log(e)
    }
  }, config.interval * 1000);
  console.log(client.user.username + "#" + client.user.discriminator + `\'s presence has updated.\nYour status will now change every '${prettyMs(config.interval * 1000, {verbose: true})}'`)
});

client.login({ clientId: config.client_id }).catch(console.error);