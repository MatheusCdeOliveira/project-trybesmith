import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
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

  public async create(name: string, amount: string) {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [{ insertId }] = result;
    return { id: insertId, name, amount };
  }

  public async getAllOrders() {
    const result = await this
      .connection.execute<RowDataPacket[]>(`
      SELECT o.id, user_id AS userId, json_arrayagg(p.id)
       AS productsIds FROM Trybesmith.orders AS o INNER JOIN
        Trybesmith.products AS p ON p.order_id = o.id GROUP BY order_id;
        `);
    const [rows] = result;
    return rows;
  }
}