import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Sender from './Sender';

class ScheduleMessage extends Model {
  public id!: number;
  public recipients!: string; // Comma-separated list of recipient IDs or phone numbers
  public senderId!: number;
  public content!: string;
  public messageType!: string;
  public userId!: number;
  public dateScheduled!: Date;
  public timeScheduled!: string; // Store time in HH:mm format or as a string
  public recursion!: string; // Could be a cron expression or description for recurrence
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ScheduleMessage.init(
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
    dateScheduled: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeScheduled: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recursion: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    tableName: 'schedulemessages',
  }
);

// Define associations
User.hasMany(ScheduleMessage, { foreignKey: 'userId' });
ScheduleMessage.belongsTo(User, { foreignKey: 'userId' });

Sender.hasMany(ScheduleMessage, { foreignKey: 'senderId' });
ScheduleMessage.belongsTo(Sender, { foreignKey: 'senderId' });

export default ScheduleMessage;
