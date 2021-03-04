require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//API SECURITY
app.use(helmet());

//handle CORS error
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== 'production') {
  const mdB = mongoose.connection;
  mdB.on('open', () => {
    console.log('MongoDB is connected');
  });
  mdB.on('error', () => {
    console.log(error);
  });
  //Logger
  app.use(morgan('tiny'));
}

//Set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('API RUNING....');
});
//Load routers
const carsRouter = require('./src/routes/carsRoutes');

// // User Routers
app.use('/api/cars', carsRouter);

// Error handler
const handleError = require('./src/utils/errorHandler');

app.use('*', (req, res, next) => {
  const error = new Error('Route not found!');
  error.status = 404;
  next(error);
});

app.use('*', (err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`http://localhost:${port} `);
});
