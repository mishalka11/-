const TelegramBot = require('node-telegram-bot-api');

// Вставьте ваш токен сюда
const token = '7419382838:AAFoOydMZk9GMiIqH_lQDb4VpIkvt3Y6ez8';

// Создаем бота с использованием долгого опроса
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Отправляем сообщение с кнопкой открытия WebApp
    bot.sendMessage(chatId, "Добро пожаловать в игру! Нажмите кнопку ниже, чтобы начать.", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Открыть игру', 
                    web_app: { 
                        url: ' https://mishalka11.github.io/tapach/'  // Замените на ваш URL
                    }
                }]
            ]
        }
    });
});

console.log('Бот запущен');
