import Container, { Service } from 'typedi';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { CreateStockDto } from '@/dtos/stock.dto';
import { FinnhubService } from '@/integrations/finnhub.service';
import { logger } from '@/utils/logger';

@Service()
export class StockService {
  private finnhub = Container.get(FinnhubService);
  private stock = new PrismaClient().stock;
  private prices: Record<string, number[]> = {};

  public async initMonitorings() {
    logger.info(`🚀 Initialize Stock Cron Jobs`);
    const stocks = await this.stock.findMany();
    stocks.forEach(stock => {
      this.addMonitoring(stock.symbol);
    });
  }

  public async addMonitoring(symbol: string) {
    cron.schedule('* * * * *', async () => {
      logger.info(`🚀 Cron Job is pulling stock prices for ${symbol}`);
      const newPrice = await this.finnhub.pullStockPrice(symbol);
      this.prices[symbol] = this.prices[symbol] || [];
      // Store last 10 prices in memory
      this.prices[symbol] = [newPrice, ...this.prices[symbol]].slice(0, 10);

      const prices = this.prices[symbol];
      const movingAverage = prices.reduce((total, price) => (total += price), 0) / prices.length;

      const stock = await this.stock.findFirstOrThrow({ where: { symbol } });

      await this.stock.update({
        where: { id: stock.id },
        data: {
          movingAverage,
          lastUpdated: new Date(),
        },
      });
    });
  }

  public getStock(symbol: string) {
    return this.stock.findFirstOrThrow({
      where: { symbol },
    });
  }

  public async addStock(data: CreateStockDto) {
    const result = await this.stock.create({
      data: {
        ...data,
        lastUpdated: new Date(),
      },
    });
    this.addMonitoring(data.symbol);
    return result;
  }
}
