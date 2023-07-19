"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _OrdersRepository = _interopRequireDefault(require("../typeorm/repositories/OrdersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowOrderService {
  async execute({
    id
  }) {
    const ordersRepository = (0, _typeorm.getCustomRepository)(_OrdersRepository.default);
    const order = await ordersRepository.findById(id);
    if (!order) {
      throw new _AppError.default('Order not found');
    }
    ;
    return order;
  }
}
var _default = ShowOrderService;
exports.default = _default;