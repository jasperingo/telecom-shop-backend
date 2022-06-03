import { Request, Response } from 'express';

const UserController = {
  create(req: Request, res: Response) {
    res.send('Yam is good');
  }
};

export default UserController;
