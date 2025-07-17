import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';
import incomingRequestLogger from './middlewares/incomingRequestLogger.js';
import connectMongoDb from './databases/mongoDb/connectMongoDb.js';
import { connectSequelize } from './databases/MySql/sequelize.js';
import { MySqlUser } from './databases/MySql/User.js';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    connectMongoDb();
    connectSequelize();

    app.use(incomingRequestLogger);
    app.use(express.json());

    /* Routes */
    app.use('/api/user', usersRouter);

    /* Default 404 Route */
    app.use((req, res) => {
      console.log(`404 Not Found: ${req.originalUrl}`);
      res.status(404).send('404 Not found');
    });

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.SERVER_PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();