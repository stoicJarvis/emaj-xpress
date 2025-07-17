import User from "../../databases/mongoDb/userModel.js";

const checkExistingAccount = async (req, res, next) => {
    try {
        const { user_name, email } = req.body;

        const existingUser = await User.findOne(
            {
                $or: [
                    { userName: user_name },
                    { email: email },
                ],
            }
        );
        
        if (existingUser) {
            console.log("User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        } else {
            next();
        }
    } catch (error) {
        console.error("Error checking existing account:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default checkExistingAccount;