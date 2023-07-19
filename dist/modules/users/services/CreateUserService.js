"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateUserService {
  //DESESTRUTURANDO: {name, email, password}: IRequest
  async execute({
    name,
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email addres already used.');
    }
    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await usersRepository.save(user);
    return user;
  }
}
var _default = CreateUserService;
exports.default = _default;