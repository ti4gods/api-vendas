"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ShowOrderService = _interopRequireDefault(require("../services/ShowOrderService"));
var _CreateOrderService = _interopRequireDefault(require("../services/CreateOrderService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class OrdersController {
  async show(request, response) {
    const {
      id
    } = request.params;
    const showOrder = new _ShowOrderService.default();
    const order = await showOrder.execute({
      id
    });
    return response.json(order);
  }
  async create(request, response) {
    const {
      customer_id,
      products
    } = request.body;
    const createOrder = new _CreateOrderService.default();
    const order = await createOrder.execute({
      customer_id,
      products
    });
    return response.json(order);
  }
}
exports.default = OrdersController;