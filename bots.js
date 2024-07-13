import { Telegraf } from 'telegraf';
import { createInterface } from "readline";
import axios from "axios";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (question) =>
    new Promise((resolve) => rl.question(question, resolve));

const accessToken = await question("Enter your bot access token: ");
const bot = new Telegraf(accessToken);

const checkBot = async () => {
    const url = `https://api.telegram.org/bot${accessToken}/getMe`;
    try {
        const response = await axios.get(url);
        if (response.data.ok) {
            console.log('Bot token is valid. Bot information:', response.data.result);
            return response.data.result;
        } else {
            console.error('Invalid bot token:', response.data);
            process.exit(1);
        }
    } catch (error) {
        console.error('Error checking bot token:', error);
        process.exit(1);
    }
};

const botInfo = await checkBot();
bot.botInfo = botInfo;
bot.reaction("👍", (ctx) => {
    // user added a 👍 reaction
    console.log("added")
});

console.log('Configuring bot commands...');
const domain = "https://lxxxxxxi.github.io/ton-start/"

bot.start((ctx) => ctx.reply('Welcome to pocket game!!!', {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "开始游戏", web_app: {
                        url: `${domain}/#/`
                    }
                },
                {
                    text: "关于我们", callback_data: "about_us"
                }], [
                {
                    text: "棋牌游戏", web_app: {
                        url: `${domain}/#/gamelist?type=6`
                    }
                },
                {
                    text: "真人游戏", web_app: {
                        url: `${domain}/#/gamelist?type=1`
                    }
                }], [
                {
                    text: "捕鱼游戏", web_app: {
                        url: `${domain}/#/gamelist?type=2`
                    }
                },
                {
                    text: "电子游戏", web_app: {
                        url: `${domain}/#/gamelist?type=3`
                    }
                }
            ],
        ],
        one_time_keyboard: true,
    }
}));

bot.action("about_us", (ctx) => {
    ctx.reply("关于我们");
});

// 启动机器人
console.log('Launching bot...');

bot.launch({ allowedUpdates: ["message", "message_reaction"] }, () => console.log("Bot is starting!")).then(() => {
    console.log('Bot launched successfully');
}).catch((error) => {
    console.error('Error launching bot:', error);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
