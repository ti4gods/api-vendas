"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateSessionsService = _interopRequireDefault(require("../services/CreateSessionsService"));
var _classTransformer = require("class-transformer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const createSession = new _CreateSessionsService.default();
    const user = await createSession.execute({
      email,
      password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
}
exports.default = SessionsController;