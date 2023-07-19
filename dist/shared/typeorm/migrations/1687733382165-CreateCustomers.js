"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomers1687733382165 = void 0;
var _typeorm = require("typeorm");
class CreateCustomers1687733382165 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'customers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('customers');
  }
}
exports.CreateCustomers1687733382165 = CreateCustomers1687733382165;