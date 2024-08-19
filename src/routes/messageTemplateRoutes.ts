import { Router } from 'express';
import MessageTemplate from '../models/MessageTemplate';
import User from '../models/User';

const router = Router();

// Create a new message template
router.post('/', async (req, res) => {
  try {
    const { title, content, userId, messageCategory } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const messageTemplate = await MessageTemplate.create({ title, content, userId, messageCategory });
    res.status(201).json(messageTemplate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all message templates
router.get('/', async (req, res) => {
  try {
    const messageTemplates = await MessageTemplate.findAll({ include: [User] });
    res.json(messageTemplates);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get message template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messageTemplate = await MessageTemplate.findByPk(id, { include: [User] });

    if (!messageTemplate) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    res.json(messageTemplate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get message templates by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const messageTemplates = await MessageTemplate.findAll({ where: { userId }, include: [User] });

    res.json(messageTemplates);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update message template by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, messageCategory } = req.body;

    const messageTemplate = await MessageTemplate.findByPk(id);

    if (!messageTemplate) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    messageTemplate.title = title;
    messageTemplate.content = content;
    messageTemplate.messageCategory = messageCategory;

    await messageTemplate.save();

    res.json(messageTemplate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete message template by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messageTemplate = await MessageTemplate.findByPk(id);

    if (!messageTemplate) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    await messageTemplate.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
