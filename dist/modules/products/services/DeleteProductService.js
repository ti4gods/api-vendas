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
class DeleteProductService {
  async execute({
    id
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new _AppError.default('Product not found.');
    }

    // const redisCache = new RedisCache();

    await _RedisCache.default.invalidade('api-vendas-PRODUCT_LIST');

    //Exclui o produto no BD
    await productsRepository.remove(product);
  }
}
var _default = DeleteProductService;
exports.default = _default;