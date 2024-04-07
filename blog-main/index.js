const express = require('express');
const route = require('./route');
const bodyParser = require('body-parser');
const app = express();
//require ejs layout
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const routes = require('./src/router/routes')


//middleware

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json());

//set view engine
app.set('view engine', 'ejs');
//set layout
app.use(expressLayouts);
app.set('layout', 'layouts/main');
//global static files path  
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('pages/index', {title: "landing",} );
});


app.use('/', route);
app.use('/api', routes);  



app.listen(4004, () => {
    console.log('Server is running on port 5880');
});

