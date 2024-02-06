import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StockController } from '@/controllers/stock.controller';

export class StockRoute implements Routes {
  public path = '/stock';
  public router = Router();
  public controller = new StockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.controller.getStockInfo);
    this.router.post(`${this.path}`, this.controller.addStock);
  }
}
