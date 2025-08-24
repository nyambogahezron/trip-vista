import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

import connectDB from './config/db';
import errorHandler from './middleware/errorMiddleware';
import notFound from './middleware/notFound';
import userRoutes from './routes/userRoutes';
import listingRoutes from './routes/listingRoutes';
import travelGroupsRoutes from './routes/travelGroupsRoutes';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

// Middlewares
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/listing', listingRoutes);
app.use('/api/v1/travelGroup', travelGroupsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>TRIP-VISTA API</h1><a href="/api-docs">Documentation</a>');
});

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

app.use(errorHandler);
app.use(notFound);

// Start server
const port = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
