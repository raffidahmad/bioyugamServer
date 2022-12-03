const express = require('express');
var cors = require('cors');
var parseString = require('xml2js').parseString;
const app = express();
const port = 3000;
var allowedOrigins = ['http://localhost:3000',
    'https://bioyugam.vercel.app/']; app.use(cors({
        origin: function (origin, callback) {    // allow requests with no origin 
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            } return callback(null, true);
        }
    }));


// app.get('/', (req, res) => {
//     //send as json
//     res.json({ message: 'Hello World!' });
// });

app.get('/', (req, res) => {
    fetch(`http://api.juju.com/jobs?
    partnerid=a22e764782e9cf803d160f9417cce8fd&k&
    c=biotech-pharmaceutical+health-care+hospitality+human-resources+nursing&
    l=Chicago%2C+IL&
    useragent=Mozilla%2F5.0+(Macintosh%3B+U%3B+Intel+Mac+OS+X+10.6%3B+en-US%3B+rv%3A1.9.1.7)+Gecko%2F20091221+Firefox%2F3.5.7&
    ipaddress=98.193.69.227` , {
        method: 'GET',
        headers: {
            'Content-Type': 'text/xml'
        }
    }).then(response => {
        return response.text();
    }).then(responseText => {
        var xmlData = responseText;
        parseString(xmlData, function (err, result) {
            console.log(result);
            res.status(200).json({ result });
          });
        // parseString(xmlData, function (err, result) {
        //     const keys = Object.keys(result);
        //     const subKeys = Object.keys(result[keys[0]]);
        //     const channel = result[keys[0]][subKeys[1]];
        //     const items = channel[0].item;
        //     console.log(items);
        //     res.json(items);
        // });
    }).catch(err => {
        res.json(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;