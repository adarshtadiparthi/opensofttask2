const UserModel = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const { authenticateToken } = require('../middleware/auth');

/**POST: http://localhost:8000/api/signup 
 * @param : {
    "username":"example123",
    "password":"Adarsh@123",
    "email":"example@gmail.com"
 * } 
*/
async function signup(req, res) {
    try {
        const { username, password, email } = req.body;

        // Check if user exists
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            throw { error: "Please use a unique username or email" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            email,
        });

        await user.save();

        return res.status(201).send({ msg: "User registration successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: `Error in signup process: ${error.message || "Unknown error"}` });
    }
}

/**POST: http://localhost:8000/api/login 
 * @param : {
    "username":"example123",
    "password":"Adarsh@123"
 * } 
*/
async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Username not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Password doesn't match" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET, // Use process.env to access environment variables
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            msg: "Login Successful",
            username: user.username,
            token,
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/**GET: http://localhost:8000/api/user/example123 */
async function getUser(req, res) {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).send({ error: 'Invalid Username' });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Remove sensitive data before sending the response
        const { password, ...userWithoutPassword } = user.toObject();

        return res.status(200).send(userWithoutPassword);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = { signup, login, getUser };
