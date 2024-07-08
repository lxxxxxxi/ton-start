import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { createInterface } from "readline";
import axios from "axios";

function exitError(error) {
    console.error(`Error! ${error}`);
    process.exit(1);
}

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (question) =>
    new Promise((resolve) => rl.question(question, resolve));

const accessToken = await question("Enter your bot access token: ");
const bot = new Telegraf(accessToken)


const url = `https://api.telegram.org/bot${accessToken}/getMe`;
const getBot = await axios.get(
    url
).catch(exitError);

console.log(getBot);

bot.start((ctx) => ctx.reply('Welcome to pocket game!!!', {
    reply_markup: {
        keyboard: [
            [
                {
                    text: "开始游戏", web_app: {
                        url: "https://4a13-14-154-0-21.ngrok-free.app"
                    }
                },
                {
                    text: "棋牌游戏", web_app: {
                        url: "https://4a13-14-154-0-21.ngrok-free.app/gamelist/1"
                    }
                }
            ]
        ]
    }
}))

bot.launch()