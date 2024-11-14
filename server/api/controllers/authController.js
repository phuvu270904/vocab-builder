import Auth from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';

export const register = async (req, res) => {
    const email = req.body.email.toLowerCase();
    const user = await Auth.findOne({ email });
    if (user) res.status(409).send('Email already exists');
    else {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = {
            email,
            password: hashPassword,
            username: req.body.username,
            phone: req.body.phone
        };
        const createUser = new Auth(newUser);
        await createUser.save();
        if (!createUser) {
            return res
                .status(400)
                .send('Error creating user');
        }
        return res.send({
            email
        });
    }
}

export const login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).send('Username or password is incorrect');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Password is incorrect');
        }

        const accessTokenSecret = process.env.JWT_SECRET;

        const dataForAccessToken = {
            id: user._id,
            username: user.username,
            email
        };

        const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: '1h' });

        if (!accessToken) {
            return res
                .status(401)
                .send('Error creating access token');
        }

        let refreshToken = randToken.generate(120);

        if (!user.refreshToken) {
            await Auth.updateOne({ email }, { refreshToken });
        } else {
            refreshToken = user.refreshToken;
        }

        return res.json({
            message: 'Login success',
            token: accessToken,
            refreshToken,
            username: user.username,
            email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    await Auth.updateOne({ refreshToken }, { refreshToken: '' });
    res.send('Logout success');
}

export const profile = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required' });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Auth.findById(decoded.id).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        delete user.password;
        res.status(200).json({
            token,
            user
        }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const refresh = async (req, res) => {
    const accessTokenFromHeader = req.headers['authorization']?.split(" ")[1];
	if (!accessTokenFromHeader) {
		return res.status(400).send('Cannot find access token.');
	}

	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Cannot find refresh token.');
	}

	const accessTokenSecret =
		process.env.JWT_SECRET || jwtVariable.accessTokenSecret;

	const decoded = await jwt.verify(accessTokenFromHeader, accessTokenSecret, { ignoreExpiration: true });

	if (!decoded) {
		return res.status(400).send('Access token is invalid.');
	}

	const email = decoded.email;

	const user = await Auth.findOne({ email });
	if (!user) {
		return res.status(401).send('User not found');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Invalid refresh token');
	}

	const dataForAccessToken = {
		id: user._id,
        username: user.username,
        email
	};

	const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: "1h" });

	if (!accessToken) {
		return res
			.status(400)
			.send('Error creating access token');
	}
	return res.json({
		token: accessToken,
	});
}