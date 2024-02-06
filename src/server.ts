import { App } from '@/app';
import { IndexRoute } from '@/routes/index.route';
import { StockRoute } from '@/routes/stock.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new IndexRoute(), new StockRoute()]);
app.listen();
