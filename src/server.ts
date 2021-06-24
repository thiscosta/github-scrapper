process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import InfoRoutes from '@/application/routes/info';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
    new InfoRoutes(),
]);

app.listen();
