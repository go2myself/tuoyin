const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ArticleSchema = new mongoose.Schema({
  content: {
    raw: String,
    html: String,
  },
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

ArticleSchema.statics = {
  // 获取所有文章列表
  get(id) {
    return this.findById(id).exec().then((user) => {
      if (user) {
        return user;
      }
      return new APIError('没找到这篇文章', httpStatus.NOT_FOUND);
    });
  },
  list({ limit = 50, skip = 0 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .limit(+limit)
      .skip(+skip)
      .select('-content')
      .exec();
  },
};

module.exports = mongoose.model('article', ArticleSchema);
