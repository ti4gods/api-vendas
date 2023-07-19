"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrdersProducts1688151410606 = void 0;
var _typeorm = require("typeorm");
class CreateOrdersProducts1688151410606 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders_products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'quantity',
        type: 'int'
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
    await queryRunner.dropTable('orders_products');
  }
}
exports.CreateOrdersProducts1688151410606 = CreateOrdersProducts1688151410606;