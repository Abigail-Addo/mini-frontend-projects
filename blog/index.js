const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./src/routes/route');
const routes = require('./routes');

const path = require('path');
const PORT = process.env.PORT;

const expressLayouts = require('express-ejs-layouts');
const { render } = require('ejs');

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}))


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('pages/index', {title: "Login",} );
// });


app.use('/', routes);
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});