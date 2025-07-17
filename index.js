import express from 'express';
import figlet from 'figlet';
import chalk from 'chalk';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';
import incomingRequestLogger from './middlewares/incomingRequestLogger.js';
import connectMongoDb from './databases/mongoDb/connectMongoDb.js';
import { connectSequelize } from './databases/MySql/sequelize.js';
import authMiddleWare from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import asyncHandler from './utils/asyncHandler.js';
import AppError from './utils/AppError.js';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    /* Datasbase connections */
    connectMongoDb();
    connectSequelize();

    /* Middlewares */
    app.use(incomingRequestLogger);
    app.use(express.json());
    app.use(cookieParser());

    /* Routes */
    app.use('/api/user', usersRouter);

    app.get('/ping', authMiddleWare, (_, res) => {
      res.send('pong');
    });

    app.get("/user", asyncHandler(async (_, res) => {
      const error = new AppError("User not found!", 404);
      throw error;
    }))

    /* Default 404 Route */
    app.use((req, res) => {
      console.log(`404 Not Found: ${req.originalUrl}`);
      res.status(404).send('404 Not found');
    });

    /* Error-handling middleware */
    app.use((err, req, res, next) => {
      const status = err.statusCode || 500;
      res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    });

    app.listen(process.env.SERVER_PORT, () => {
      figlet('emaj-xpress', (err, data) => {
        if (err) {
          console.log('Error creating ASCII art');
          console.dir(err);
          return;
        }
        console.log(chalk.white(data));
        console.log(`🚀 Server is running on port ${process.env.SERVER_PORT}`);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();