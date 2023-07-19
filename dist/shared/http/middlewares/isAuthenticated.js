"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAutenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _auth = _interopRequireDefault(require("../../../config/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isAutenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT Token is missing.');
  }

  // Bearer hsdufhadufdsfsdf4ds4fsd864f8
  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    console.log(decodedToken);

    //ID do usuário
    const {
      sub
    } = decodedToken;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT Token.');
  }
}