import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class MessageTemplate extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public messageCategory!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MessageTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    messageCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'message_templates',
  }
);

// Define associations
User.hasMany(MessageTemplate, { foreignKey: 'userId' });
MessageTemplate.belongsTo(User, { foreignKey: 'userId' });

export default MessageTemplate;
