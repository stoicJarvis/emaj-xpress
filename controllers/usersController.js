import User from "../databases/mongoDb/userModel.js";
import { MySqlUser } from "../databases/MySql/User.js";
import bcrypt from 'bcrypt';
import { HASHING_SALT_ROUNDS } from "../constants.js";

const createAccountController = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, HASHING_SALT_ROUNDS);

        /* Saving data to mongoDB */
        const newUser = new User({
            userName: user_name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();

        /* Saving data to MySql */
        await MySqlUser.create({
            username: user_name,
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error creating user", error);
        res.status(500).json({ message: "Error creating user" });
    }
}

const loginUserController = async (req, res) => {
    const { user_name, password } = req.body;

    const user = await User.findOne(
        {
            userName: user_name
        }
    ).select("+password");

    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
}

export { createAccountController, loginUserController };