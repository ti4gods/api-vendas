"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListCustomerService {
  async execute() {
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customers = await customersRepository.createQueryBuilder().paginate();
    return customers;
  }
}
var _default = ListCustomerService;
exports.default = _default;