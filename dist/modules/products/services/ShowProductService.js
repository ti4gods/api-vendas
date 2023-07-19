"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProductsRepository = require("../typeorm/repositories/ProductsRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowProductService {
  async execute({
    id
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new _AppError.default('Product not found.');
    }
    return product;
  }
}
var _default = ShowProductService;
exports.default = _default;