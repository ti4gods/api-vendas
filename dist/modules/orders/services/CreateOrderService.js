"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CustomersRepository = _interopRequireDefault(require("../../customers/typeorm/repositories/CustomersRepository"));
var _ProductsRepository = _interopRequireDefault(require("../../products/typeorm/repositories/ProductsRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _OrdersRepository = _interopRequireDefault(require("../typeorm/repositories/OrdersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateOrderService {
  async execute({
    customer_id,
    products
  }) {
    const ordersRepository = (0, _typeorm.getCustomRepository)(_OrdersRepository.default);
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default);
    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new _AppError.default('Could not find any customer with the given id.');
    }
    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts.length) {
      throw new _AppError.default('Could not find any products with the given ids.');
    }
    const existsProductsIds = existsProducts.map(product => product.id);
    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));
    if (checkInexistentProducts.length) {
      throw new _AppError.default(`Could not find product ${checkInexistentProducts[0].id}.`);
    }
    const quantityAvailable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity);
    if (quantityAvailable.length) {
      throw new _AppError.default(`The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`);
    }
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }));
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });
    const {
      order_products
    } = order;
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));
    await productsRepository.save(updatedProductQuantity);
    return order;
  }
}
var _default = CreateOrderService;
exports.default = _default;