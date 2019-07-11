const fs = require('fs');
const { join } = require('path');
const helpers = require('../helpers');
const config = require('../../config/config.js');

const { APIResTemplate } = helpers;
// eslint-disable-next-line no-unused-vars
const upload = (req, res, next) => {
  if (!req.files || !req.files.image) {
    return res.json(helpers.APIResTemplate.fail('必须上传一张图片'));
  }
  const uploadImage = req.files.image;
  // 开始写入文件
  const { imagesDir } = config;
  const imagePath = join(imagesDir, uploadImage.name);
  fs.rename(uploadImage.path, imagePath, (err) => {
    if (err) {
      return res.json(APIResTemplate.fail('文件写入本地出错，请检查文件名'));
    }
    return res.json(APIResTemplate.ok(`images/${uploadImage.name}`));
  });
  return null;
};

exports.upload = upload;
