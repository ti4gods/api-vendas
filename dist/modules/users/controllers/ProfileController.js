"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ShowProfileService = _interopRequireDefault(require("../services/ShowProfileService"));
var _UpdateProfileService = _interopRequireDefault(require("../services/UpdateProfileService"));
var _classTransformer = require("class-transformer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProfileController {
  async show(request, response) {
    const showProfile = new _ShowProfileService.default();
    const user_id = request.user.id;
    const user = await showProfile.execute({
      user_id
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
  async update(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = request.body;
    const updateProfile = new _UpdateProfileService.default();
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
}
exports.default = ProfileController;