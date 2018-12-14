import express from 'express';
import mongoose from 'mongoose';
import config from './config';


import expressConfig from './config/express';


mongoose.connect(config.DATABASE_URL, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    logger.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


require('./app/models/Key');
require('./app/models/Data');

const port = process.env.PORT || 3023;
const app = express();

expressConfig(app);

app.listen(port);
logger.info(`Application started on port ${port}`);

export default app;
