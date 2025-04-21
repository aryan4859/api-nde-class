const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

// rate limiting
const ratelimit = require('express-rate-limit');

const limiter = ratelimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 10,
    message: 'Too many requests, please try again later.'

});

//app.use(limiter);

app.use(express.json());

app.post('/api/login', limiter, (req, res) => {
    const {username} = req.body;
    if (!username) {
        return res.status(400).json({error: 'Username is required'});
    }
    const token = jwt.sign({username}, SECRET, {expiresIn: '1h'});
    res.json({token});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

app.get('/api/authcheck',authenticateToken, (req, res) => {
    res.json({message: 'Auth check passed', name: req.user});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);