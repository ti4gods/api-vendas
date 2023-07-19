"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _path = _interopRequireDefault(require("path"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _UserTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UserTokensRepository"));
var _EtherealMail = _interopRequireDefault(require("../../../config/mail/EtherealMail"));
var _SESMail = _interopRequireDefault(require("../../../config/mail/SESMail"));
var _mail = _interopRequireDefault(require("../../../config/mail/mail"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SendForgotPasswordEmailService {
  async execute({
    email
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokensRepository.default);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const {
      token
    } = await userTokenRepository.generate(user.id);
    const forgotPasswordTemplate = _path.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    //Se for ses está no ambiente de produção.
    if (_mail.default.driver === 'ses') {
      await _SESMail.default.sendMail({
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[API Vendas] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
          }
        }
      });
      return;
    }
    await _EtherealMail.default.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }
}
var _default = SendForgotPasswordEmailService;
exports.default = _default;