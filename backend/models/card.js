const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Поле должно содержать от 2 до 30 символов.'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов.'],
  },

  link: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
