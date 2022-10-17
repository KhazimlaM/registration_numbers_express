const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')({});
const myRoutes = require('./routes/routes')
const app = express();
const myRegistration = require('./regDB');




const DATABASE_URL = process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/registration";

const config = {
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const db = pgp(config);
const myReg = myRegistration(db);




app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
  secret: 'codeforgeek',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());



app.get('/', function (req, res) {
    
    res.render('index');

});

app.post('/', async function (req, res) {
  let myBody = req.body.name
  await myReg.addRegNumber(myBody)
  res.redirect("back")
})

app.get('/reg_numbers', function (req, res) {
    res.render('', {
    
    });

});

app.post('/reg_numbers', function (req, res) {
    res.render('', {
       
    });

});




const PORT = process.env.PORT || 4040;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});


