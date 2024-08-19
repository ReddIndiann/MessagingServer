import { Router } from 'express';
import Group from '../models/Group';
import User from '../models/User';

const router = Router();

// Create a new group
router.post('/', async (req, res) => {
  try {
    const { groupName, members, userId } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const group = await Group.create({ groupName, members, userId });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
// Get all groups 
router.get('/', async (req, res) => {
  try {
    const groups = await Group.findAll({ include: [User] });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
