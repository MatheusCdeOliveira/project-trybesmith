import { Pool, RowDataPacket } from 'mysql2/promise';
// import connection from './connection';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this
      .connection.execute<RowDataPacket[]>('SELECT * FROM Trybesmith.products');
    const [rows] = result;
    return rows;
  }
}