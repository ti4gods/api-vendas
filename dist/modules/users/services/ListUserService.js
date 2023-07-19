"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListUsertService {
  async execute() {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const users = usersRepository.find();
    return users;
  }
}
var _default = ListUsertService;
exports.default = _default;