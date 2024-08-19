import { Router } from 'express';
import Contact from '../models/Contact';
import User from '../models/User';
import Group from '../models/Group';

const router = Router();

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, birthday, phone, email, userId, groupId } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const contact = await Contact.create({ firstName, lastName, birthday, phone, email, userId, groupId });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ include: [User, Group] });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
