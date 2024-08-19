import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Group extends Model {
  public id!: number;
  public groupName!: string;
  public members!: string; // Comma-separated list of member IDs
  public userId!: number; // User that owns the group
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'groups',
  }
);

// Define associations
User.hasMany(Group, { foreignKey: 'userId' });
Group.belongsTo(User, { foreignKey: 'userId' });

export default Group;
