"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../config/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateSessionsService {
  //DESESTRUTURANDO: { email, password}: IRequest
  async execute({
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('Incorretc e-mail/password combination.', 401);
    }
    const passwordConfirmed = await (0, _bcryptjs.compare)(password, user.password);
    if (!passwordConfirmed) {
      throw new _AppError.default('Incorretc e-mail/password combination.', 401);
    }
    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }
}
var _default = CreateSessionsService;
exports.default = _default;