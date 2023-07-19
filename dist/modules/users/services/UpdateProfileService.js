"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    const userUpdateEmail = await usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new _AppError.default('There is already one user with this e-mail.');
    }
    if (password && !old_password) {
      throw new _AppError.default('Old password is required.');
    }
    ;
    if (password && old_password) {
      const checkOldPassword = await (0, _bcryptjs.compare)(old_password, user.password);
      if (!checkOldPassword) {
        throw new _AppError.default('Old password does not match.');
      }
      user.password = await (0, _bcryptjs.hash)(password, 8);
    }
    user.name = name;
    user.email = email;
    await usersRepository.save(user);
    return user;
  }
}
var _default = UpdateProfileService;
exports.default = _default;