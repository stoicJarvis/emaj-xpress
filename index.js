import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';
import incomingRequestLogger from './middlewares/incomingRequestLogger.js';
import { connectMongoDb } from './databases/mongoDb/connectMongoDb.js';

dotenv.config();

const app = express();

connectMongoDb();

app.use(incomingRequestLogger);
app.use(express.json());

/* Routes */
app.use('/api/user', usersRouter)

/* Default 404 Route */
app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).send('404 Not found');
})

/* Server */
app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.SERVER_PORT}`);
});