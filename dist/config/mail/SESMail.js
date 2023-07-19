"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _HandlebarsMailTemplate = _interopRequireDefault(require("./HandlebarsMailTemplate"));
var _mail = _interopRequireDefault(require("./mail"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SESlMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const mailTemplate = new _HandlebarsMailTemplate.default();
    const transporter = _nodemailer.default.createTransport({
      SES: new _awsSdk.default.SES({
        apiVersion: '2010-12-01'
      })
    });
    const {
      email,
      name
    } = _mail.default.defaults.from;
    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
  }
}
exports.default = SESlMail;