import Bot from "./bot/bot";

// configuring the environment
// tslint:disable-next-line: no-var-requires
require("dotenv").config();

/**
 * Index of the discord bot
 * @author Matteo AUGER
 */
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

// creating the bot and listening for any message
if (token && prefix) {
    const bot = new Bot(token, prefix);
    bot.listen().catch((err) => { throw err; });
} else {
    throw Error("Application environment is not set up correctly. Please refer to the README.");
}
