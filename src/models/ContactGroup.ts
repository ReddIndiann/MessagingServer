// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database';
// import Contact from './Contact';
// import Group from './Group';

// class ContactGroup extends Model {
//   public contactId!: number;
//   public groupId!: number;
// }

// ContactGroup.init(
//   {
//     contactId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       references: {
//         model: Contact,
//         key: 'id',
//       },
//       allowNull: false,
//     },
//     groupId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       references: {
//         model: Group,
//         key: 'id',
//       },
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'contactGroups',
//   }
// );

// // Define the many-to-many associations
// Contact.belongsToMany(Group, { through: ContactGroup, foreignKey: 'contactId', as: 'Groups' });
// Group.belongsToMany(Contact, { through: ContactGroup, foreignKey: 'groupId', as: 'Contacts' });

// export default ContactGroup;
