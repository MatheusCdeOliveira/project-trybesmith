import connection from '../models/connection';
import UsersModel from '../models/user.model';
import generateTokenJWT from '../utils/generateToken';

export default class UserService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async createUser(username:string, vocation: string, level: number, password: string) {
    const newUser = await this.model.createUser(username, vocation, level, password);
    const token = generateTokenJWT(newUser);
    return { token };
  }
}