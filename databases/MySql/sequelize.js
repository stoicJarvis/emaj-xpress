import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelizeInstance = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: true,
  }
);

const connectSequelize = async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('✅ Sequelize: MySQL connection successfully.');
    } catch (error) {
        console.error('❌ Sequelize connection error:', error);
        process.exit(1);
    }
}

export { sequelizeInstance, connectSequelize };