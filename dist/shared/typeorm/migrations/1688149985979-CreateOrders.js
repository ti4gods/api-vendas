"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrders1688149985979 = void 0;
var _typeorm = require("typeorm");
class CreateOrders1688149985979 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
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
    await queryRunner.dropTable('orders');
  }
}
exports.CreateOrders1688149985979 = CreateOrders1688149985979;