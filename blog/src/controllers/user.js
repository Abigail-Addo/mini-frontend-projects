const User = require('../model/user');

// login a user
exports.getUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Email, username and password are required' });
        }

        const userEmail = await User.query().where('email', email).first();
        const userName = await User.query().where('username', username).first();
        const userPassword = await User.query().where('password', password).first();

        if (userName && userEmail && userPassword) {
            return res.status(200).json(userEmail);
        } else {
            return res.status(404).json({ message: 'Invalid email or username' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.query();
        if (!allUsers) {
            throw new Error("The user table doesn't exist.");
        }
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

//create a new user
exports.createUser = async (req, res) => {
    try {
        const { username,  password, profile_photo, location, email } = req.body;

         // Check if the email already exists in the database
         const existingEmail = await User.query().where('email', email).first();

         if (existingEmail) {
             return res.status(400).json({ message: 'Email already exists!' });
         }

        if (!username || !password || !profile_photo || !location || !email) {
            return res.status(400).json({ message: 'Username, password, profile_photo , location and  email are required' });
        }

        const user = await User.query().insert({
            username,
            password,
            profile_photo,
            location,
            email
        });

        if (!user) {
            throw new Error('User cannot be created');
        }

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}