// / Libraries
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
// / Database
import { connectMongoDB } from './db/connectMongoDB.js';
// / Middlewares
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
// / Routes
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(cors());

// ! Routes

app.use(studentsRoutes);

// ! Middlewares

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

// ! connecting to MongoDB
await connectMongoDB();

// ! Server startup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
