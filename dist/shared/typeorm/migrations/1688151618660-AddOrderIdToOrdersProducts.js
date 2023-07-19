"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddOrderIdToOrdersProducts1688151618660 = void 0;
var _typeorm = require("typeorm");
class AddOrderIdToOrdersProducts1688151618660 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders_products', new _typeorm.TableColumn({
      name: 'order_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('orders_products', new _typeorm.TableForeignKey({
      name: 'OrdersProductsOrder',
      columnNames: ['order_id'],
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
    await queryRunner.dropColumn('orders_products', 'order_id');
  }
}
exports.AddOrderIdToOrdersProducts1688151618660 = AddOrderIdToOrdersProducts1688151618660;