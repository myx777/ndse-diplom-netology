const Chat = require('../models/chat');
const Message = require('../models/messages');
const mongoose = require('mongoose');

class ChatService {
  /**
   * Метод «Получить чат между пользователями»
   * @param {ObjectId[]} users - массив из двух ObjectId, представляющих ID пользователей
   * @returns {Promise<Chat|null>} - Объект модели Chat или null, если чат не найден
   * @throws {Error} - Ошибка, если аргумент некорректен или произошла ошибка при поиске
   **/
  async find(users) {
    if (
      !Array.isArray(users) ||
      users.length !== 2 ||
      !users.every(mongoose.Types.ObjectId.isValid)
    ) {
      throw new Error(
        `Аргумент должен быть массивом из двух валидных ObjectId`,
      );
    }
    try {
      const chatFound = await Chat.findOne({ users: { $all: users } }).select(
        '-__v',
      );
      return chatFound || null;
    } catch (err) {
      throw new Error(`Не найден совместный чат пользователей, ошибка: ${err}`);
    }
  }

  /**
   * «Отправить сообщение»
   * @param {Object} data - объект с данными сообщения
   * @param {ObjectId} data.author - ID автора сообщения
   * @param {ObjectId} data.receiver - ID получателя сообщения
   * @param {string} data.text - текст сообщения
   * @returns {Promise<Chat>} - Объект модели Chat с обновленным сообщением
   * @throws {Error} - Ошибка, если аргумент некорректен или произошла ошибка при отправке сообщения
   **/
  async sendMessage(data) {
    const { author, receiver, text } = data;

    if (
      !mongoose.Types.ObjectId.isValid(author) ||
      !mongoose.Types.ObjectId.isValid(receiver) ||
      typeof text !== 'string'
    ) {
      throw new Error('Некорректные данные для отправки сообщения');
    }

    try {
      let chat = await this.find([author, receiver]);
      if (chat === null) {
        chat = await new Chat({ users: [author, receiver], messages: [] });
        await chat.save();
      }

      const message = await new Message({ author, text });
      chat.messages.push(message);
      await chat.save();

      return chat;
    } catch (err) {
      throw new Error(`Ошибка при отправке сообщения: ${err}`);
    }
  }

  subscribe(data, cb) {
    const { chatId, message } = data;
    if (
      !mongoose.Types.ObjectId.isValid(chatId) ||
      !(message instanceof Message)
    ) {
      throw new Error(`Ошибка в типах данных при подписке на сообщения`);
    }
  }
}

module.exports = new ChatService();
