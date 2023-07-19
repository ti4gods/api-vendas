"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _multer = _interopRequireDefault(require("multer"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = _path.default.resolve(__dirname, '..', '..', 'temp');
var _default = {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = _crypto.default.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        callback(null, filename);
      }
    })
  },
  config: {
    aws: {
      bucket: 'api-vendas'
    }
  }
};
exports.default = _default;