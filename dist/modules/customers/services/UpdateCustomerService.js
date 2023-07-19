"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateCustomerService {
  async execute({
    id,
    name,
    email
  }) {
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new _AppError.default('Customer not found.');
    }
    const customerExists = await customersRepository.findByEmail(email);
    if (customerExists && email !== customer.email) {
      throw new _AppError.default('There is already one customer with this e-mail.');
    }
    customer.name = name;
    customer.email = email;
    await customersRepository.save(customer);
    return customer;
  }
}
var _default = UpdateCustomerService;
exports.default = _default;