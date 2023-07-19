"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListProductService = _interopRequireDefault(require("../services/ListProductService"));
var _ShowProductService = _interopRequireDefault(require("../services/ShowProductService"));
var _CreateProductService = _interopRequireDefault(require("../services/CreateProductService"));
var _UpdateProductService = _interopRequireDefault(require("../services/UpdateProductService"));
var _DeleteProductService = _interopRequireDefault(require("../services/DeleteProductService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProductsController {
  async index(request, response) {
    //Instância do serviço "ListProductService"
    const listProducts = new _ListProductService.default();
    const products = await listProducts.execute();
    return response.json(products);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showProduct = new _ShowProductService.default();
    const product = await showProduct.execute({
      id
    });
    return response.json(product);
  }
  async create(request, response) {
    const {
      name,
      price,
      quantity
    } = request.body;
    const createProdutc = new _CreateProductService.default();
    const product = await createProdutc.execute({
      name,
      price,
      quantity
    });
    return response.json(product);
  }
  async update(request, response) {
    const {
      name,
      price,
      quantity
    } = request.body;
    const {
      id
    } = request.params;
    const updateProduct = new _UpdateProductService.default();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    });
    return response.json(product);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteProduct = new _DeleteProductService.default();
    await deleteProduct.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = ProductsController;