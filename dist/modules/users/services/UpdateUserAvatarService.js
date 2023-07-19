"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _upload = _interopRequireDefault(require("../../../config/upload"));
var _S3StorageProvider = _interopRequireDefault(require("../../../shared/providers/StorageProvider/S3StorageProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUserAvatarService {
  //DESESTRUTURANDO: {name, email, password}: IRequest
  async execute({
    user_id,
    avatarFilename
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    if (_upload.default.driver === 's3') {
      const s3Provider = new _S3StorageProvider.default();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const fileName = await s3Provider.saveFile(avatarFilename);
      user.avatar = fileName;
    } else {
      const diskProvaider = new _S3StorageProvider.default();
      if (user.avatar) {
        await diskProvaider.deleteFile(user.avatar);
      }
      const fileName = await diskProvaider.saveFile(avatarFilename);
      user.avatar = fileName;
    }
    await usersRepository.save(user);
    return user;
  }
}
var _default = UpdateUserAvatarService;
exports.default = _default;