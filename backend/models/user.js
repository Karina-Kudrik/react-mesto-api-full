const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов.'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов.'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: isURL,
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Введите почту'],
    validate: {
      validator: isEmail,
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Пользователь не найден');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
