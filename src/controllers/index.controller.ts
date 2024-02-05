import { NextFunction, Request, Response } from 'express';

export class IndexController {
  public home = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).write('Hello world!');
    } catch (error) {
      next(error);
    }
  };
}
