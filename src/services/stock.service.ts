import Container, { Service } from 'typedi';
import cron from 'node-cron';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateStockDto } from '@/dtos/stock.dto';
import { FinnhubService } from '@/integrations/finnhub.service';
import { logger } from '@/utils/logger';
import { roundDecimal } from '@/utils';

@Service()
export class StockService {
  private finnhub = Container.get(FinnhubService);
  private db = new PrismaClient();
  private stock = this.db.stock;
  private stockPrice = this.db.stockPrice;
  private priceStore: Record<string, number[]> = {};

  public async initMonitorings() {
    logger.info(`🚀 Initialize Stock Cron Jobs`);
    const stocks = await this.stock.findMany({ include: { prices: true }, orderBy: { lastUpdated: 'desc' }, take: 10 });
    stocks.forEach(stock => {
      this.priceStore[stock.symbol] = stock.prices.map(price => price.price.toNumber());
      this.addMonitoring(stock.symbol);
    });
  }

  public async addMonitoring(symbol: string) {
    cron.schedule('* * * * *', async () => {
      logger.info(`🚀 Cron Job is pulling stock prices for ${symbol}`);
      const newPrice = await this.finnhub.pullStockPrice(symbol);
      this.priceStore[symbol] = this.priceStore[symbol] || [];

      // Store last 10 prices in memory
      this.priceStore[symbol] = [newPrice, ...this.priceStore[symbol]].slice(0, 10);

      const prices = this.priceStore[symbol];
      const movingAverage = roundDecimal(prices.reduce((total, price) => (total += price), 0) / prices.length);

      const stock = await this.stock.findFirstOrThrow({ where: { symbol } });

      await this.db.$transaction([
        this.stockPrice.create({
          data: {
            price: newPrice,
            stockId: stock.id,
          },
        }),
        this.stock.update({
          where: { id: stock.id },
          data: {
            movingAverage,
            lastUpdated: new Date(),
          },
        }),
      ]);
    });
  }

  public getStock(symbol: string) {
    return this.stock.findFirstOrThrow({
      where: { symbol },
    });
  }

  public async addStock(data: CreateStockDto) {
    const result = await this.stock.create({ data });
    this.addMonitoring(data.symbol);
    return result;
  }
}
