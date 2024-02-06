import { StockService } from '@/services/stock.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class StockController {
  private service = Container.get(StockService);

  public getStockInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { symbol } = req.params;
      const data = this.service.getStock(symbol);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public addStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;
      const data = this.service.addStock(body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
