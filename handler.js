'use strict';

const app = require('./app');
const PORT = 3000;
const ngrok = require('ngrok');
const EventEmitter = require('events').EventEmitter;
const ev = new EventEmitter();

const slack_url = process.env.SLACK_URL;
const https = require('https');
const url = require('url');

const postSlack = (msg) => {
  const opts = url.parse(slack_url);
  opts.method = 'POST';
  opts.headers = {'Content-Type': 'application/json'};
  const req = https.request(opts, (res) => {
    console.log("Send a slack message: " + res.statusCode);
  });
  req.on('error', (err) => {console.log(err)});
  req.write(JSON.stringify({text: msg}));
  req.end();
}

module.exports.server = (event, context, callback) => {
  let URL;
  const server = app.start(PORT, context, (req, res) => {
    ngrok.kill();
    console.log('Receive Bye request');
    postSlack('Closed ' + URL);
    ev.emit('kill');
  })

  ngrok.connect(PORT, (err, url) => {
    if (err) {
      callback(err, null);
      return;
    }
    URL = url;
    ev.once('kill', () => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Good bye' }),
      };
      server.close();
      console.log('App closed.');
      callback(null, response);
    })
    postSlack('Go ' + URL);
    console.log('Connect to %s', URL);
  })
};
