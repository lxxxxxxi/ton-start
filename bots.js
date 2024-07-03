import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (question) =>
    new Promise((resolve) => rl.question(question, resolve));


const accessToken = await question("Enter your bot access token: ");
const bot = new Telegraf(accessToken)

bot.start((ctx) => ctx.reply('Welcome'))

bot.launch()