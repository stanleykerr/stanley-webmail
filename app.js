const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./lib/passport');

const config = require('./config');

const app = express();
//app.use(express.static('./server/static/'));
//app.use(express.static('./client/dist/'));
app.use(bodyParser.json());
app.use(passport.initialize());

// LOAD MODELS HERE
require('./models').connect(config.mongoURI).then(() => {
  passportConfig.init(passport);
});

app.use('/api/emails', './routes/api/emails');
app.use('/api/auth', './routes/api/auth');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(('client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))