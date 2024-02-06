import { Service } from 'typedi';
import axios from 'axios';
import { FinnhubQuote } from '@/interfaces/finnhub.interface';

@Service()
export class FinnhubService {
  async pullStockPrice(symbol: string) {
    return await axios
      .get<FinnhubQuote>(`${process.env.FINNHUB_API_URL}quote?symbol=${symbol}`, {
        headers: {
          'X-Finnhub-Token': process.env.FINNHUB_API_TOKEN,
        },
      })
      .then(function (response) {
        return response.data.c;
      });
  }
}
