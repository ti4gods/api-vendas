"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ResetPasswordService = _interopRequireDefault(require("../services/ResetPasswordService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ResetPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body;
    const resetPassword = new _ResetPasswordService.default();
    await resetPassword.execute({
      password,
      token
    });

    //Retornando para o frontend que tudo ocorreu conforme esperado
    return response.status(204).json();
  }
}
exports.default = ResetPasswordController;