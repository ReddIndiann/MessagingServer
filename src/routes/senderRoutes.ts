import { Router } from 'express';
import Sender from '../models/Sender';
import User from '../models/User';

const router = Router();

// Create a new sender
router.post('/', async (req, res) => {
  try {
    const { name, userId, purpose } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sender = await Sender.create({ name, userId, purpose });
    res.status(201).json(sender);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all senders
router.get('/', async (req, res) => {
  try {
    const senders = await Sender.findAll({ include: [User] });
    res.json(senders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get sender by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sender = await Sender.findByPk(id, { include: [User] });

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    res.json(sender);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get senders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const senders = await Sender.findAll({ where: { userId }, include: [User] });

    if (!senders.length) {
      return res.status(404).json({ error: 'No senders found for this user' });
    }

    res.json(senders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update sender by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, purpose, status } = req.body;

    const sender = await Sender.findByPk(id);

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    sender.name = name || sender.name;
    sender.purpose = purpose || sender.purpose;
    sender.status = status || sender.status;

    await sender.save();

    res.json(sender);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete sender by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sender = await Sender.findByPk(id);

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    await sender.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
