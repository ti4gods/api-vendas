"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OrdersRepository = void 0;
var _typeorm = require("typeorm");
var _Order = _interopRequireDefault(require("../entities/Order"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let OrdersRepository = (_dec = (0, _typeorm.EntityRepository)(_Order.default), _dec(_class = class OrdersRepository extends _typeorm.Repository {
  async findById(id) {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer']
    });
    return order;
  }
  async createOrder({
    customer,
    products
  }) {
    const order = this.create({
      customer,
      order_products: products
    });
    await this.save(order);
    return order;
  }
}) || _class);
exports.OrdersRepository = OrdersRepository;
var _default = OrdersRepository;
exports.default = _default;