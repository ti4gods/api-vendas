"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateCustomerService {
  //DESESTRUTURANDO: {name, email }: IRequest
  async execute({
    name,
    email
  }) {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email addres already used.');
    }
    const customer = customerRepository.create({
      name,
      email
    });
    await customerRepository.save(customer);
    return customer;
  }
}
var _default = CreateCustomerService;
exports.default = _default;