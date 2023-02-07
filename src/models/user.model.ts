import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/IUser';

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

  public async login(username: string, password: string): Promise<IUser[]> {
    const user = await this.connection.execute(
      `SELECT id, username, vocation, level FROM Trybesmith.users
         WHERE username = '${username}' AND password = '${password}'`,
    );
    const [rows] = user;
    return rows as IUser[];
  } 
}
