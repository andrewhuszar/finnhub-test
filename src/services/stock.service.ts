import { Service } from 'typedi';
import { PrismaClient } from '@prisma/client';
import { CreateStockDto } from '@/dtos/stock.dto';

@Service()
export class StockService {
  private stock = new PrismaClient().stock;

  public getStock(symbol: string) {
    return this.stock.findFirst({
      where: {
        symbol,
      },
    });
  }

  public addStock(data: CreateStockDto) {
    return this.stock.create({
      data: {
        ...data,
        lastUpdated: new Date(),
      },
    });
  }
}
