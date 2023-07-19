"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProductsRepository = require("../typeorm/repositories/ProductsRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateProductService {
  //DESESTRUTURANDO: {name, price, quantity}: IRequest
  async execute({
    name,
    price,
    quantity
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.ProductRepository);
    const productExists = await productsRepository.findByName(name);

    //Se existe um produto com o nome que está sendo informado.
    if (productExists) {
      throw new _AppError.default('There is already one product wih this name.');
    }
    ;

    // const redisCache = new RedisCache();

    const product = productsRepository.create({
      name,
      price,
      quantity
    });
    await _RedisCache.default.invalidade('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);
    return product;
  }
}
var _default = CreateProductService;
exports.default = _default;