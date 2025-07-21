import { where } from "sequelize";
import UserModel from "../databases/models/UserModel.js";

const createUserController = async (req, res) => {

    const { firstName, lastName, password } = req.body;

    try {
        const user = await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            password: password
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating user");
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error getting users");
    }
}

const deleteUserController = async (req, res) => {
    const id = req.params.id;

    try {
        await UserModel.destroy({
            where: {
                id: id
            }
        })
        res.json("User deleted id:", id);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
    }

}

const updateUserContoller = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, password } = req.body;

    try {

        const [updatedRows] = await UserModel.update(
            {
                firstName: firstName,
                lastName: lastName,
                password: password
            },
            {
                where: {
                    id: id
                }
            }
        );
        res.json(updatedRows);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user");
    }
}

export {
    createUserController,
    getAllUsersController,
    deleteUserController,
    updateUserContoller
};