require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const upload = require('./src/middleware/multer');

app.use(helmet());
app.use(cors());
app.use(express.json());

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

const port = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('API RUNING....');
});
//Load routers
const carsRouter = require('./src/routes/carsRoutes');
const customersRouter = require('./src/routes/customersRoutes');
const rentRouter = require('./src/routes/rentRoutes');

// // User Routers
app.use('/api/cars', carsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/rent-a-car', rentRouter);

app.post('/single', upload.single('imgUrl'), (req, res) => {
  console.log(req.file);

  res.send(req.file);
});
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
