# Discord-Presence (Multi Button/Link Changing)
This is a guide on how to have the brand new Rich-Presence beta on your profile!

> ## Setup the Rich Presence
> - Step One: Download [Node JS](https://nodejs.org/), please make sure to have the LTS version.
> - Step Two: Download [Visual Studio Code](https://code.visualstudio.com/)
> - Step Three: Open your command prompt (You can do this by pressing `WINDOWS + R` on your keyboard, and then typing `cmd`.
> - Step Four: In your command prompt, type `cd Desktop`. (This is going to cd in to your Desktop directory.)
> - Step Five: In your command prompt, type `mkdir Rich-Presence` `cd Rich-Presence` `mkdir settings`. (This is going to create two new folders in your Desktop called "Rich-Presence. and settings inside that folder")
~~> - Step Six:  In your command prompt, type `npm init --y`. (This will create the node_modules folder, make the package.json and package-lock.json.)~~ (This is automatically done for you by the default package.json)
> - Step Six: In your command prompt, type `npm i`. (This will download the modules you NEED for this to work.)
> - Step Seven: In your command prompt type `code .`. (This will open [Visual Studio Code](https://code.visualstudio.com) to the folder you have created.)
> - Step Eight: In Visual Studio Code, create a new file called `index.js`. (This will create a JavaScript file which allows us to edit JavaScript code.)
> - Step Nine: Go to the [Discord Developers Portal](https://discord.com/developers/applications) and hit a button that says `Create Application`. (This creates a 
> Discord Application, so the RPC can fetch the assets you set.)
> - Step Ten: Once you are done creating the application, you must go to the Rich Presence Tag => Assets and choose the assets you would like and then copy the asset ID and paste it in something like notepad.
> - Step Eleven: Then go to The general tab in your Discord Developer Poartal application and click Copy Client ID, and put that in your note pad as well.
> - Step Tweleve: In Visual Studio Code, go to your file named `index.js`, and paste this code:
 ```js
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
    console.error("Due to Discord API Ratelimiting, it is best to keep the interval count above 60 (60 seconds)");
    process.exit(0);
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
```
> - Step Thirteen: Go back to you command prompt or powershell, and type `node .`, and you are done!

## Congratulations, you did it!
> - If you do not see your presence but your command line says something like `"<Your_username_and_tag>'s's presence has updated.
Your status will now change every '1 minute'"`. Then it did work. You just can't see it, in some cases... but everyone else can. This has happened to me. 
> ~~- Make sure your Visual Studio Code Discord Presence Is Off (If you do not have this, this does not apply to you.) or you just check anything that has `instance: true`.~~
> - The above has now been automated, so if you do have a VSC RPC plugin, it will be automatically over ridden by your new RPC. (optional feature, you can also change this to `false` in the configuration file, which will allow VSC RPC plugins to override this RPC) 
> *Please join [Blurple Development](https://blurple.gg/discord) if you are having issues with this presence guide.*


> **NOTE**:
> "Due to Discord API Ratelimiting, it is best to keep the interval count above 60 (60 seconds)" will appear if you change the `interval` in the configuration file to below `60` 

**Support this guide made by `4D#9999` & `🎀❤Pikachilla❤🎀#3129` (contributor)**

**Join the [Blurple Development](https://blurple.gg/discord) Server for more help if you so wish.**

###### Original Developer: `4D#9999`
###### Contributor: `🎀❤Pikachilla❤🎀#3129`
