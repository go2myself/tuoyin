function ok(data) {
  return {
    statusCode: 1,
    data
  };
}
function fail(data) {
  if (typeof data === 'object') {
    return {
      statusCode: 0,
      data,
      msg: data.msg
    };
  }
  if (typeof data === 'string') {
    return {
      statusCode: 0,
      msg: data
    };
  }
  return {
    statusCode: 0,
    data: null
  };
}
module.exports.ok = ok;
module.exports.fail = fail;
