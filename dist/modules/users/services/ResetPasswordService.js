"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _bcryptjs = require("bcryptjs");
var _dateFns = require("date-fns");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _UserTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UserTokensRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ResetPasswordService {
  async execute({
    token,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokensRepository.default);
    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new _AppError.default('User Token does not exists.');
    }
    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreatedAt, 2);
    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expired.');
    }

    //atualiza a senha
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await usersRepository.save(user);
    console.log(user);
  }
}
var _default = ResetPasswordService;
exports.default = _default;