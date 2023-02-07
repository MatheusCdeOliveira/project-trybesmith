import connection from '../models/connection';
import UsersModel from '../models/user.model';
import generateTokenJWT from '../utils/generateToken';
import generateTokenLoginJWT from '../utils/generateTokenLogin';

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

  public async login(username: string, password: string) {
    const user = await this.model.login(username, password);
    if (user.length === 0) return { message: 'Username or password invalid' };
    const token = generateTokenLoginJWT({ username, password });
    return { token };
  }
}