// auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    
    // res.send(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }
 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Corrected usage of process.env.JWT_SECRET
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
