const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');


const indexRoutes  = require('./routes/index');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const videoRoutes = require('./routes/videos');


app.use('/', indexRoutes);
app.use('/', contactRoutes);
app.use('/', adminRoutes);
app.use('/', videoRoutes);


app.listen(8080, 'localhost');