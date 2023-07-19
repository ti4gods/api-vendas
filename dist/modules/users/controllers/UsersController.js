"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));
var _ListUserService = _interopRequireDefault(require("../services/ListUserService"));
var _classTransformer = require("class-transformer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersController {
  async index(request, response) {
    const listUser = new _ListUserService.default();
    console.log(request.user.id);
    const users = await listUser.execute();
    return response.json((0, _classTransformer.instanceToInstance)(users));
  }
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = new _CreateUserService.default();
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
}
exports.default = UsersController;