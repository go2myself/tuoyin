const jwt = require('jsonwebtoken');
const User = require('./user.model');
const APIHelper = require('../helpers');
// const httpStatus = require('http-status');
const config = require('../../config/config');
/**
 * Load user and append to req.
 */
const { ok, fail } = APIHelper.APIResTemplate;
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Register new user
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function register(req, res, next) {
  // 验证手机号码是否已被注册
  User.getByMobileNumber(req.body.mobileNumber).then((result) => {
    if (result) {
      return res.json(APIHelper.APIResTemplate.fail('该手机号码已被注册'));
    }
    // 手机号码可用，返回JWT
    const user = new User({
      password: req.body.password,
      mobileNumber: req.body.mobileNumber
    });
    user.save()
      .then(savedUser => res.json(APIHelper.APIResTemplate.ok({
        jwt: jwt.sign({
          id: savedUser.id,
          mobileNumber: savedUser.mobileNumber
        }, config.jwtSecret)
      })))
      .catch(e => next(e));
    return null;
  });
}
/**
 * user login
 * @param {string} req.body.password - The password of user.
 * @param {string} req.body.mobileNumber - The mobileNumber of user.
 * @return {jwt}
 */
function login(req, res, next) {
  const { mobileNumber, password } = req.body;
  User.findOne({ mobileNumber, password }).then((result) => {
    if (result) {
      res.json(APIHelper.APIResTemplate.ok({
        jwt: jwt.sign({
          id: result.id,
          mobileNumber: result.mobileNumber
        }, config.jwtSecret),
      }));
    } else {
      res.json(APIHelper.APIResTemplate.fail('用户名或者密码错误'));
    }
  }).catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const { user } = req;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  const userJwt = req.body.jwt;
  // eslint-disable-next-line no-unused-vars
  jwt.verify(userJwt, config.jwtSecret, (err, decodeObj) => {
    if (err) {
      res.json(fail(err.message));
    } else {
      user.save()
        // eslint-disable-next-line no-unused-vars
        .then(savedUser => res.json(ok()))
        .catch(e => next(e));
    }
  });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const { user } = req;
  const userJwt = req.body.jwt;
  // eslint-disable-next-line no-unused-vars
  jwt.verify(userJwt, config.jwtSecret, (err, decodeObj) => {
    if (err) {
      res.json(fail(err.message));
    } else {
      user.remove()
        .then(deletedUser => res.json(ok(deletedUser)))
        .catch(e => next(e));
    }
  });
}

module.exports = {
  load, get, register, login, update, list, remove
};
