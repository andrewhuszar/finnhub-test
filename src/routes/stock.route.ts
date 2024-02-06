import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StockController } from '@/controllers/stock.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateStockDto } from '@/dtos/stock.dto';

export class StockRoute implements Routes {
  public path = '/stock';
  public router = Router();
  public controller = new StockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.controller.getStockInfo);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateStockDto), this.controller.addStock);
  }
}
