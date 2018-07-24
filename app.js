const app = require('express')();
const basicAuth = require('express-basic-auth');
const pass = process.env.BASIC_PASSWORD || "secret";

app.start = (port, context, callback) => {
    app.context = context
    app.quit = callback;
    return app.listen(port,  () => {
        console.log('App listening on port %d', port);
    })
}

app.use(basicAuth({
    users: {'admin': pass},
    challenge: true,
    realm: 'lambda-ngrok'
}))
  
app.get('/bye', (req, res) => {
    app.quit(req, res);
})

app.get('/', (req, res) => {
    const now = new Date();
    const remain = app.context.getRemainingTimeInMillis();
    res.send('Current Time: ' + now + '<br/>Remain: ' + remain / 1000 + '<br/><a href="/bye">Quit</a>');
})

module.exports = app;
