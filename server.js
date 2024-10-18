const express = require('express');
const app = express();
const db = require('./db'); // Ensure correct path to the db file/module
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT=process.env.PORT || 3000;
// Respond with "Welcome to my hotel" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my hotel...How can I help you? We have a list of menus.');
});

const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes')

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes)


app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
