"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListCustomerService = _interopRequireDefault(require("../services/ListCustomerService"));
var _ShowCustomerService = _interopRequireDefault(require("../services/ShowCustomerService"));
var _CreateCustomerService = _interopRequireDefault(require("../services/CreateCustomerService"));
var _UpdateCustomerService = _interopRequireDefault(require("../services/UpdateCustomerService"));
var _DeleteCustomerService = _interopRequireDefault(require("../services/DeleteCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CustomerController {
  async index(request, response) {
    const listCustomers = new _ListCustomerService.default();
    const customers = await listCustomers.execute();
    return response.json(customers);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showCustomer = new _ShowCustomerService.default();
    const customer = await showCustomer.execute({
      id
    });
    return response.json(customer);
  }
  async create(request, response) {
    const {
      name,
      email
    } = request.body;
    const createCustomer = new _CreateCustomerService.default();
    const customer = await createCustomer.execute({
      name,
      email
    });
    return response.json(customer);
  }
  async update(request, response) {
    const {
      name,
      email
    } = request.body;
    const {
      id
    } = request.params;
    const updateCustomer = new _UpdateCustomerService.default();
    const customer = await updateCustomer.execute({
      id,
      name,
      email
    });
    return response.json(customer);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteCustomer = new _DeleteCustomerService.default();
    await deleteCustomer.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = CustomerController;