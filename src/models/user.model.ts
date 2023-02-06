import { Pool, ResultSetHeader } from 'mysql2/promise';

export default class UsersModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUser(username:string, vocation: string, level: number, password: string) {
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    return { username, vocation, level, password };
  }
}
