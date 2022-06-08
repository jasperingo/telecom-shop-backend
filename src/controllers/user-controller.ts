import { Request, Response } from 'express';
import ResponseDTO from '../dtos/response-dto';

const UserController = {
  create(req: Request, res: Response) {
    res.send(ResponseDTO.success('User created'));
  }
};

export default UserController;
