const express = require('express');
var cors = require('cors');
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
app.get('/', (req, res) => {
    //send as json
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;