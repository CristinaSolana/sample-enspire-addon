# Getting it working local

1. In retailpoint-client-site/app.js:
    * line 3, add: var $https = require('https');
    * line 231, add:
        ```
        $app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'https://cristinasolana.github.io');
            next();
        });
        ```
    * line 265, add: 
        ```
        var ssl = {
            key: $fs.readFileSync('./ssl/localhost-retailpoint.pem', 'utf8'),
            cert: $fs.readFileSync('./ssl/fullchain.pem', 'utf8')
        };
        ```
    * add ssl param on line 270 with: 
        ```
        $https.createServer(ssl, $app).listen($app.get('port'), function(){
        ```
2. Drop ssl included in this repo into retailpoint-client-site root

---

_Note: these changes should only be used local_
