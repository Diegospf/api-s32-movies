// /backend/src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const s32listRoutes = require('./routes/s32listRoutes');
const mylistRoutes = require('./routes/mylistRoutes');
const weekRoutes = require('./routes/weekRoutes');
const rateRoutes = require('./routes/rateRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/user', userRoutes);
app.use('/s32list', s32listRoutes);
app.use('/mylist', mylistRoutes);
app.use('/week', weekRoutes);
app.use('/rate', rateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
