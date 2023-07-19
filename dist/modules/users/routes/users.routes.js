"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("../../../config/upload"));
var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _UsersAvatarController = _interopRequireDefault(require("../controllers/UsersAvatarController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersRouter = (0, _express.Router)();
const userController = new _UsersController.default();
const usersAvatarController = new _UsersAvatarController.default();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.get('/', _isAuthenticated.default, userController.index);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), userController.create);
usersRouter.patch('/avatar', _isAuthenticated.default, upload.single('avatar'), usersAvatarController.update);
var _default = usersRouter;
exports.default = _default;