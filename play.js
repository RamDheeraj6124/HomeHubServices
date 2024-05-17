const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/allroutes');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Hi')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const {addUser}=require('./controllers/addUser');
const {addsearch}=require('./controllers/insertsearch');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie:{
    maxAge:1000*60*60
  }
}));

app.set('view engine', 'ejs');

app.use('/', allRoutes);

addUser('Bhargavim', 'ffsd1@gmail.com', '1', 2);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
