"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ordersRouter = (0, _express.Router)();
const ordersController = new _OrdersController.default();
ordersRouter.use(_isAuthenticated.default);
ordersRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ordersController.show);
ordersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    customer_id: _celebrate.Joi.string().uuid().required(),
    products: _celebrate.Joi.required()
  }
}), ordersController.create);
var _default = ordersRouter;
exports.default = _default;