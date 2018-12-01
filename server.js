// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

// port
const PORT = process.env.PORT || 8080;

// creates instance
const app = express();

// static content for app
app.use(express.static('public'));

// body and JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets is handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// sets up routes
const routes = require('./controllers/burgers_controller.js');
app.use(routes);

app.listen(PORT, () => {
    console.log('Server is listening on PORT:' + PORT);
});

