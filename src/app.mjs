import express from 'express'
import bodyParser from 'body-parser'
import errorhandler from 'errorhandler'
import cors from 'cors'
import methodOverride from 'method-override'
import api from './server/routes/index.mjs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import settings from "./settings.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(settings.NAVI_CLIENT_BASE_URL, express.static(__dirname + '/../public'));

if (!isProduction) {
    app.use(errorhandler());
}

app.use(settings.NAVI_API_BASE_URL, api);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

// finally, let's start our server...
var server = app.listen(settings.NAVI_PORT, function () {
    console.log('Server listening on port ' + server.address().port);
    console.log('Client exposed on ' + settings.NAVI_EXTERNAL_URL + settings.NAVI_CLIENT_BASE_URL);
    console.log('Server exposed on ' + settings.NAVI_EXTERNAL_URL + settings.NAVI_API_BASE_URL);
});