const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/register').post(userCtrl.register);
router.route('/login').post(userCtrl.login);
router.route('/:userId')
// 修改用户信息
  .put(userCtrl.update)
// 删除用户
  .delete(userCtrl.remove);


// router.route('/')
//   /** GET /api/user - Get list of users */
//   .get(userCtrl.list)

//   /** POST /api/user - Create new user */
//   .post(validate(paramValidation.createUser), userCtrl.create);

// router.route('/:userId')
//   /** GET /api/user/:userId - Get user */
//   .get(userCtrl.get)

//   /** PUT /api/user/:userId - Update user */
//   .put(validate(paramValidation.updateUser), userCtrl.update)

//   /** DELETE /api/user/:userId - Delete user */
//   .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
