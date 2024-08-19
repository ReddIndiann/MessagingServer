import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Sender extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
  public purpose!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sender.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'senders',
  }
);

// Define associations
User.hasMany(Sender, { foreignKey: 'userId' });
Sender.belongsTo(User, { foreignKey: 'userId' });

export default Sender;
