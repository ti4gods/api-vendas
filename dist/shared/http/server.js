"use strict";

require("reflect-metadata");
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _celebrate = require("celebrate");
var _typeormPagination = require("typeorm-pagination");
var _routes = _interopRequireDefault(require("./routes"));
var _AppError = _interopRequireDefault(require("../errors/AppError"));
require("../typeorm");
var _upload = _interopRequireDefault(require("../../config/upload"));
var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());

//Limita a quantidades de requisições conforme parâmetros definidos.
app.use(_rateLimiter.default);
app.use(_typeormPagination.pagination);
app.use('/files', _express.default.static(_upload.default.directory)); //rota para consumo frontend
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((error, request, response, next) => {
  if (error instanceof _AppError.default) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Erro interno do Servidor'
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});