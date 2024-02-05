import { Service } from 'typedi';
import axios from 'axios';

@Service()
export class FinnhubService {
  pullStockPrices(symbol: string) {
    axios
      .get(`${process.env.FINNHUB_API_URL}quote?symbol=${symbol}`, {
        headers: {
          'X-Finnhub-Token': process.env.FINNHUB_API_TOKEN,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.error(error);
      })
      .finally(function () {
        // always executed
      });
  }
}
