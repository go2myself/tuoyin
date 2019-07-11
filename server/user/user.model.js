const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{10}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  // 邀请码
  spreadCode: {
    type: String,
  },
  // 受邀码
  invitedCode: {
    type: String,
  },
  // 微信号
  wechat: {
    type: String,
  },
  // 已购产品列表
  purchasedProducts: {
    type: [String],
    default: []
  },
  // 利率红包列表
  ratePackets: {
    type: [String],
    default: []
  },
  // 总资产
  totalAsset: {
    type: Number,
    default: 0
  },
  // 预期总收益
  expectEarn: {
    type: Number,
    default: 0
  },
  // 用户创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * Get user
   * @param {Number} mobileNumber - The mobileNumber of user.
   * @returns {Promise<User, APIError>}
   */
  getByMobileNumber(mobileNumber) {
    return this.findOne({ mobileNumber }).exec().then((user) => {
      if (user) {
        return user;
      }
      return null;
    });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
