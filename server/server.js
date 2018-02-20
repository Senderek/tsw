//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Recipe = require('./models/recipe.js');
var User = require('./models/user');
const passport = require('passport');
const config = require('./config.json');

require('./models').connect(config.dbUri);


var app = express();
var router = express.Router();

//nr portu ustawiony na predefiniowany albo domyslny 3001
var port = process.env.API_PORT || 3001;

//db config - autogenerowany z azure
var mongoDB = 'mongodb://tswadmin:admin@ds046667.mlab.com:46667/tsw';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

//zeby cors nie przeszkadzal
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

    //no cache, always update
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// load passport strategies
const localSignupStrategy = require('./passport/local-signup.js');
const localLoginStrategy = require('./passport/login-local.js');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


const authCheckMiddleware = require('./middleware/auth-check.js');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth.js');
const apiRoutes = require('./routes/api.js');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
const publicRoutes = require('./routes/public.js');
app.use('', publicRoutes);

router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});


router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});



router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});


app.use('/api', router);
//require('./routes.js')(app); // load our routes and pass in our app and fully configured passport

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});