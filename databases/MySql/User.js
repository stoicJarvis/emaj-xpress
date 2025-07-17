import { sequelizeInstance } from "./sequelize.js"
import { DataTypes } from "sequelize";

export const MySqlUser = sequelizeInstance.define('MySqlUser', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'accounts',
    id: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});