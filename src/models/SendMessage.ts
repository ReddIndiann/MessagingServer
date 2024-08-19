import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Sender from './Sender';

class SendMessage extends Model {
  public id!: number;
  public recipients!: string; // Comma-separated list of recipient IDs or phone numbers
  public senderId!: number;
  public content!: string;
  public messageType!: string;
  public userId!: number;
  public recursion!: string; // Could be a cron expression or description for recurrence
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SendMessage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    recipients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    recursion: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    tableName: 'sendmessages',
  }
);

// Define associations
User.hasMany(SendMessage, { foreignKey: 'userId' });
SendMessage.belongsTo(User, { foreignKey: 'userId' });

Sender.hasMany(SendMessage, { foreignKey: 'senderId' });
SendMessage.belongsTo(Sender, { foreignKey: 'senderId' });

export default SendMessage;
