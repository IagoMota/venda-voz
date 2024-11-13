const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')
const port = 5000;

const client = {
    id: '10df49166beb41dda09fbd342a9b0e84',
    secret: '7c73c2adf2b14d7da406308cedbfad03'
}
let tokenData = null;
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const pathname = reqUrl.pathname;
    const query = reqUrl.query;

    switch (pathname) {
        case '/':
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fs.readFileSync('./frontend/index.html'));
            break;
        case '/id':
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(client.id));
            break;
        case '/SdkToken':
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(tokenData.access_token));
            break;
        case '/app.html':
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fs.readFileSync('./frontend/app.html'));
            break;
        case '/main.js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(fs.readFileSync('./frontend/main.js'));
            break;
        case '/src/spotify/ApiData.js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(fs.readFileSync(path.resolve(__dirname, "../frontend/src/spotify") + '/ApiData.js'));
            break;
        case '/src/spotify/Ui.js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(fs.readFileSync(path.resolve(__dirname, "../frontend/src/spotify") + '/Ui.js'));
            break;
        case '/src/spotify/SdkConnection.js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(fs.readFileSync(path.resolve(__dirname, "../frontend/src/spotify") + '/SdkConnection.js'));
            break;
        case '/src/spotify/Timer.js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(fs.readFileSync(path.resolve(__dirname, "../frontend/src/spotify") + '/Timer.js'));
            break;
        case '/auth/callback':
            const { code } = query;
            const authHeader = 'Basic ' + Buffer.from(`${client.id}:${client.secret}`).toString('base64');
            const params = new URLSearchParams({
                code,
                redirect_uri: `http://localhost:${port}/auth/callback`,
                grant_type: 'authorization_code'
            });

            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: { 'Authorization': authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            })
                .then(response => response.json())
                .then(body => {
                    tokenData = body;
                    res.writeHead(302, { 'Location': '/app.html' });
                    res.end();
                    return;
                })
                .catch(error => console.error('Error during fetch:', error));

            break;
    }
})
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});