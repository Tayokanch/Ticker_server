import { registerDb } from "../Domain/domain.js";

const user = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json('Missing field in the request body');
        }

        const newUser = await registerDb(firstname, lastname, email, password);
        return res.status(201).json("You've Successfully registered");
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { user };
