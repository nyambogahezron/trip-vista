require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//database connection
const connectDB = require('./config/db.js');

// routes middleware
const errorHandler = require('./middleware/errorMiddleware.js');
const notFound = require('./middleware/notFound.js');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// routes
const userRoutes = require('./routes/userRoutes.js');
const listingRoutes = require('./routes/listingRoutes.js');
const travelGroupsRoutes = require('./routes/travelGroupsRoutes.js');

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

app.get('/', (req, res) => {
   res.send('<h1>TRIP-VISTA API</h1><a href="/api-docs">Documentation</a>');
});

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

app.use(errorHandler);
app.use(notFound);

//start server
const port = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
