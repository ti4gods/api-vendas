"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UpdateUserAvatarService = _interopRequireDefault(require("../services/UpdateUserAvatarService"));
var _classTransformer = require("class-transformer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserAvatarController {
  async update(request, response) {
    const updateAvatar = new _UpdateUserAvatarService.default();
    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
}
exports.default = UserAvatarController;