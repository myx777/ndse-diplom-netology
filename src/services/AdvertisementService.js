// Сервис обработки объявлений
const Advertisement = require('../models/advertisement');
const mongoose = require('mongoose');

class AdvertisementService {

  /**
   * создание объявления в БД
   * @param {Object} data - данные для создания объявления
   * @returns {Promise} - резолвится с объектом модели Advertisement
   */
  async create(data) {
    try {
      const advertisement = new Advertisement(data);
      return await advertisement.save();
    } catch (err) {
      throw new Error(`Ошибка создания нового объявления: ${err}`);
    }
  }

  /**
   * ищет объявление в БД по полям: shortText, description, userId, tags
   * @param {Object} params - параметры поиска
   * @returns {Promise<Array>} - резолвится с массивом объектов модели Advertisement или пустым массивом
   */
  async find(params) {
    if(!params) return null;
    try {
      const searchConditions = { isDeleted: false };

      const { shortText, description, userId, tags } = params;
      if (shortText) {
        searchConditions.shortText = {
          $regex: shortText,
          $options: 'i',
        };
      }
      if (description) {
        searchConditions.description = {
          $regex: description,
          $options: 'i',
        };
      }
      if (userId) {
        searchConditions.userId = userId;
      }
      if (tags && tags.length > 0) {
        searchConditions.tags = { $all: tags };
      }
      const result = await Advertisement.find(searchConditions).select('-__v');
      return result || [];
    } catch (err) {
      throw new Error(`Ошибка поиска объявления: ${err}`);
    }
  }

  /**
   * не удаляет, а ищет объявление в БД по ID и переводит флаг isDeleted в true
   * @param {string|ObjectId} id - ID объявления
   * @returns {Promise<Object|null>} - обновленный объект или null, если не найден
   */
  async remove(id) {
    try {
      if (
        id &&
        (typeof id === 'string' || mongoose.Types.ObjectId.isValid(id))
      ) {
        return await Advertisement.findByIdAndUpdate(id, {
          isDeleted: true,
        });
      } else {
        throw new Error(`Неверный формат id: ${id}`)
      }
    } catch (err) {
      throw new Error(`Ошибка удаления объявления: ${err}`);
    }
  }
}

module.exports = new AdvertisementService();