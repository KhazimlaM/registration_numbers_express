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



app.get('/', async function (req, res) {
  
   let regnumber = await myReg.getRegNumbers()
   console.log(regnumber);

    res.render('index',{
      regnumber
    });

});

app.post('/', async function (req, res) {
  let myBody = req.body.name
  let newBody =  myBody.toUpperCase()

  if(newBody){

    let res = await myReg.addRegNumber(newBody)
    if(res == "Valid"){
      req.flash('success', 'Registration Number Added')

    } else if(res == "Invalid"){
      req.flash('info', 'Invalid Registration Number')

    }

  }else{

    req.flash('info', 'Please Enter Registration Number')
  }
  res.redirect("back")
})



app.get('/clear', async function (req, res) {
  await myReg.clear()
  req.flash('info', 'Registration Number Cleared')

    res.redirect('back');

});




const PORT = process.env.PORT || 4040;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});


