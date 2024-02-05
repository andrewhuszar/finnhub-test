import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { IndexController } from '@/controllers/index.controller';

export class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.home);
  }
}
