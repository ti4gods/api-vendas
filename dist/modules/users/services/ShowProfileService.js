"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowProfileService {
  async execute({
    user_id
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    return user;
  }
}
var _default = ShowProfileService;
exports.default = _default;