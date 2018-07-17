'use strict';

const app = require('express')();
const basicAuth = require('express-basic-auth');
const PORT = parseInt(Math.random()*16383+49152);
const ngrok = require('ngrok');
const EventEmitter = require('events').EventEmitter;
const ev = new EventEmitter();
const pass = process.env.BASIC_PASSWORD || "secret";
const slack_url = process.env.SLACK_URL;
const https = require('https');
const url = require('url');

const postSlack = (msg) => {
  const opts = url.parse(slack_url);
  opts.method = 'POST';
  opts.headers = {'Content-Type': 'application/json'};
  const req = https.request(opts, (res) => {
    console.log(res.statusCode);
  });
  req.on('error', (err) => {console.log(err)});
  req.write(JSON.stringify({text: msg}));
  req.end();
}

module.exports.server = (event, context, callback) => {
  app.use(basicAuth({
    users: {'admin': pass},
    challenge: true,
    realm: 'lambda-ngrok'
  }))
  
  app.get('/bye', (req, res) => {
    ngrok.kill();
    console.log('Receive Bye request')
    ev.emit('kill')
  })

  app.get('/', (req, res) => {
    const now = new Date();
    const remain = context.getRemainingTimeInMillis();
    res.send('Hello World' + now + '<br/>Remain: ' + context.getRemainingTimeInMillis() / 1000);
  })

  const server = app.listen(PORT, () => {
    console.log('App listening on port %d', PORT);
  })

  ngrok.connect(PORT, (err, url) => {
    if (err) {
      callback(err, null);
      return;
    }
    ev.once('kill', () => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Good bye' }),
      };
      server.close();
      console.log('App closed.');
      callback(null, response);
    })
    postSlack('Go ' + url);
    console.log('Connect to %s', url);
  })
};
