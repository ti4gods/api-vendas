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
class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity
  }) {
    //Instanciando o repositório
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.ProductRepository);

    //Localiza o produto desejado pelo ID
    const product = await productsRepository.findOne(id);

    //Testa se o produto foi localizado
    if (!product) {
      throw new _AppError.default('Product not found.');
    }

    //Pesquisa se o nome do produto já está existe (já em uso por outro produto)
    const productExists = await productsRepository.findByName(name);

    //Se existe um produto com o nome que está sendo informado.
    if (productExists) {
      throw new _AppError.default('There is already one product wih this name.');
    }
    ;

    // const redisCache = new RedisCache();

    await _RedisCache.default.invalidade('api-vendas-PRODUCT_LIST');

    //Atualzando as informações do produto com os novos valores.
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    //Atualiza o produto no BD
    await productsRepository.save(product);
    return product;
  }
}
var _default = UpdateProductService;
exports.default = _default;