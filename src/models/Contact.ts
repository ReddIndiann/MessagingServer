import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Group from './Group';

class Contact extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public birthday!: Date;
  public phone!: string;
  public email!: string;
  public userId!: number;
  public groupId!: number; // Association to Group
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'contacts',
  }
);

// Define associations
User.hasMany(Contact, { foreignKey: 'userId' });
Contact.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(Contact, { foreignKey: 'groupId' });
Contact.belongsTo(Group, { foreignKey: 'groupId' });

export default Contact;
