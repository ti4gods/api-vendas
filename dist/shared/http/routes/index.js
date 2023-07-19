"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _customers = _interopRequireDefault(require("../../../modules/customers/routes/customers.routes"));
var _orders = _interopRequireDefault(require("../../../modules/orders/routes/orders.routes"));
var _products = _interopRequireDefault(require("../../../modules/products/routes/products.routes"));
var _password = _interopRequireDefault(require("../../../modules/users/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../modules/users/routes/profile.routes"));
var _sessions = _interopRequireDefault(require("../../../modules/users/routes/sessions.routes"));
var _users = _interopRequireDefault(require("../../../modules/users/routes/users.routes"));
var _express = require("express");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/customers', _customers.default);
routes.use('/orders', _orders.default);
var _default = routes;
exports.default = _default;