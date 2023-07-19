"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeleteCustomerService {
  async execute({
    id
  }) {
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new _AppError.default('Customer not found.');
    }
    await customersRepository.remove(customer);
  }
}
var _default = DeleteCustomerService;
exports.default = _default;