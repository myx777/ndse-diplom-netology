const Chat = require('../models/chat');
const Message = require('../models/messages');
const mongoose = require('mongoose');
const EventEmitter = require('node:events');

class ChatService {

  static eventEmitter = new EventEmitter();

  /**
   * Метод «Получить чат между пользователями»
   * @param {ObjectId[]} users - массив из двух ObjectId, представляющих ID пользователей
   * @returns {Promise<Chat|null>} - Объект модели Chat или null, если чат не найден
   * @throws {Error} - Ошибка, если аргумент некорректен или произошла ошибка при поиске
   **/
  static async find(users) {
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
  static async sendMessage(data) {
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

      // уведомления всех подписчиков, кто подписался с помощью subscribe о том,
      // что в конкретном чате было добавлено новое сообщение
      this.eventEmitter.emit('newMessage', { chatId: chat.id, message });

      return chat;
    } catch (err) {
      throw new Error(`Ошибка при отправке сообщения: ${err}`);
    }
  }

  /**
   * Подписаться на новые сообщения в указанном чате.
   *
   * @param {ObjectId} chatId - ID чата, на который необходимо подписаться.
   * @param {function} callback - Функция обратного вызова, которая будет вызвана при добавлении нового сообщения.
   *   Принимает один параметр:
   *   - {Object} data - Объект с данными нового сообщения.
   *     - {ObjectId} data.chatId - ID чата, в который добавлено новое сообщение.
   *     - {Message} data.message - Объект сообщения типа Message.
   * @throws {Error} Если chatId не является валидным ObjectId.
   * @returns {void}
   */
  static subscribe(chatId, callback) {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      throw new Error(`chatId должен быть валидным ObjectId`);
    }

    this.eventEmitter.on('newMessage', data => {
      const { chatId: newMessageChatId, message } = data;
      if (
        !mongoose.Types.ObjectId.isValid(newMessageChatId) ||
        !(message instanceof Message)
      ) {
        throw new Error('Ошибка в типах данных при подписке на сообщения');
      }

      if (chatId.equals(newMessageChatId)) {
        callback({ chatId: newMessageChatId, message });
      }
    });
  }

  /**
   * Получить историю сообщений чата.
   * @param {ObjectId} id - ID чата.
   * @returns {Promise<Message[]>} - Массив сообщений.
   * @throws {Error} - Ошибка, если id некорректен или произошла ошибка при получении истории.
   */
  static async getHistory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Ошибка id!`);
    }
    try {
      const chat = await Chat.findById(id).select('-__v');
      if (!chat) {
        throw new Error(`Чат с ID ${id} не найден`);
      }
      return chat.messages;
    } catch (err) {
      throw new Error(`Ошибка получения истории сообщений чата: ${err}`);
    }
  }
}

module.exports = ChatService;