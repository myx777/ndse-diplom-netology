// использую Node crypto
const crypto = require('crypto');

// хеширование пароля
async function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(new Error(`Ошибка хеширования пароля: ${err}`));
      }

      resolve(derivedKey.toString('hex'));
    });
  });
  return { salt, hash };
}

// валидация пароля
async function validatePassword(password, hash, salt) {
  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(new Error(`Ошибка хеширования пароля: ${err}`));
      }

      resolve(derivedKey.toString('hex') === hash);
    });
  });
}

module.exports = { hashPassword, validatePassword };
