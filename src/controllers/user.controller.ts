import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public createUser = async (req: Request, res: Response) => {
    const { username, vocation, level, password } = req.body;
    const newUser = await this.userService.createUser(username, vocation, level, password);
    res.status(201).json(newUser);
  };
}