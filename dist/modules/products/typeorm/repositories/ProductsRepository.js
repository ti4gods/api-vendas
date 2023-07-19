"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProductRepository = void 0;
var _typeorm = require("typeorm");
var _Product = _interopRequireDefault(require("../entities/Product"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ProductRepository = (_dec = (0, _typeorm.EntityRepository)(_Product.default), _dec(_class = class ProductRepository extends _typeorm.Repository {
  async findByName(name) {
    const product = this.findOne({
      where: {
        name
      }
    });
    return product;
  }
  async findAllByIds(products) {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.find({
      where: {
        id: (0, _typeorm.In)(productIds)
      }
    });
    return existentProducts;
  }
}) || _class);
exports.ProductRepository = ProductRepository;
var _default = ProductRepository;
exports.default = _default;