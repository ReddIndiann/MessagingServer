// import { Router } from 'express';
// import Group from '../models/Group';
// import ContactGroup from '../models/ContactGroup';
// import Contact from '../models/Contact';

// const router = Router();

// // Add a contact to a group
// router.post('/add-to-group', async (req, res) => {
//   try {
//     const { contactId, groupId } = req.body;

//     // Check if contact and group exist
//     const contact = await Contact.findByPk(contactId);
//     const groups = await Group.findByPk(groupId);

//     if (!contact || !groups) {
//       return res.status(404).json({ error: 'Contact or Group not found' });
//     }

//     // Create the association in ContactGroup table
//     await ContactGroup.create({ contactId, groupId });

//     res.status(201).json({ message: 'Contact added to group successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Get all contacts for a specific group
// router.get('/:groupId/contacts', async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     // Find the group and include associated contacts
//     const groups = await Group.findByPk(groupId, {
//       include: {
//         model: Contact,
//         as: 'contacts', // Ensure this matches the alias in the model
//         through: { attributes: [] }, // Exclude ContactGroup data
//       },
//     });

//     if (!groups) {
//       return res.status(404).json({ error: 'Group not found' });
//     }

//     res.json(groups.contacts); // Ensure this matches the alias in the model
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default router;
