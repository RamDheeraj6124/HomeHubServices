const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const allRoutes = require('./routes/allroutes');
const app = express();
mongoose.connect('mongodb+srv://kunisettyramdheeraj061204:xX4rXj86kwhhP4pg@cluster0.ktcunuv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000 // 45 seconds
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
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




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
